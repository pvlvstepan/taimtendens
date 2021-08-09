<script context="module">
  export async function preload(page, session) {
    if (!session.isLoggedIn) {
      return this.redirect(302, 'login');
    }

    const { token } = session;

    const resultUsers = await this.fetch('dashboard/user.json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({ token: token })
    });

    const user = await resultUsers.json();

    const intakeRes = await this.fetch('users/intake.json', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    });

    const intakes = await intakeRes.json();

    return {
      user: user[0],
      intakes: intakes
    };
  }
</script>

<script>
  import CardWrapper from '../../components/CardWrapper/CardWrapper.svelte';
  import AttendanceSummary from './sections/AttendanceSummary/index.svelte';
  import AttendanceLegends from './sections/AttendanceLegends/index.svelte';
  import AttendanceView from './sections/AttendanceView/index.svelte';
  import SignAttendance from './sections/SignAttendance/index.svelte';
  import SelectStudents from './sections/SelectStudents/index.svelte';
  import { onMount } from 'svelte';

  export let user;
  export let intakes = [];

  let attendance = [];
  let currentIntake = user.role_id === 0 ? user.intake_id : intakes[0].value;
  let processedData;
  let total = 0;
  let isMounded = false;
  let timetable;
  let SignAttendanceIsOpen = false;
  let selectedTimeslot;
  let SelectStudentsIsOpen = false;
  let withNumber = false;

  const loadAttendance = async () => {
    if (isMounded) {
      const results = await fetch('attendance/attendance.json', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          intake_id: currentIntake,
          user_tp: user.user_tp,
          module_id: user.module_id,
          user_role: user.role_id
        })
      });
      attendance = await results.json();
    }
  };

  const processData = () => {
    total = 0;
    let totalClasses = 0;
    let totalStudents = 0;
    let students = 0;

    attendance.length > 0 &&
      attendance.map(record => {
        students = record.total_students = record.total_students || 0;
        const attended = (record.attended = record.attended || 0);
        let attendance = 0;
        if (user.role_id === 0) {
          attendance = (attended / record.total_classes) * 100;
        } else {
          attendance = (attended / (record.total_classes * students)) * 100;
        }
        record.attended = attended;
        record.attendance = attendance || 0;
        record.active = !!record.active;

        total += record.attendance;
        totalClasses += record.total_classes;
        totalStudents += students;
      });
    processedData = attendance;

    if (user.role_id === 0) {
      total = (total / totalClasses).toFixed(2);
    } else {
      total = (total / (totalClasses * totalStudents)).toFixed(2);
    }
  };

  $: attendance, processData();
  $: currentIntake,
    isMounded,
    SignAttendanceIsOpen,
    SelectStudentsIsOpen,
    loadAttendance();
  $: currentIntake, isMounded, loadTimetable();

  onMount(() => {
    loadAttendance();
    loadTimetable();
    isMounded = true;
  });

  const loadTimetable = async () => {
    if (isMounded) {
      const results = await fetch(
        `timetable/timetable${user.role_id === 1 ? '_lecturer' : ''}.json`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
          },
          body: JSON.stringify({
            intake: user.role_id === 2 ? currentIntake : user.intake_id,
            nextWeek: false,
            module_id: user.module_id
          })
        }
      );
      timetable = await results.json();
    }
  };
</script>

<CardWrapper>
  <AttendanceSummary
    {total}
    {user}
    {intakes}
    bind:currentIntake
    bind:SignAttendanceIsOpen
  />
  <AttendanceView {user} current={true} attendance={processedData} />
  <AttendanceView {user} current={false} attendance={processedData} />
  {#if user.role_id === 0}
    <AttendanceLegends />
  {/if}
  {#if SignAttendanceIsOpen && user.role_id !== 0}
    <SignAttendance
      bind:withNumber
      bind:currentIntake
      {user}
      {intakes}
      bind:active={SignAttendanceIsOpen}
      {timetable}
      bind:selectedTimeslot
      bind:SelectStudentsIsOpen
    />
  {/if}
  {#if SelectStudentsIsOpen && user.role_id !== 0}
    <SelectStudents
      {selectedTimeslot}
      {withNumber}
      bind:active={SelectStudentsIsOpen}
    />
  {/if}
</CardWrapper>

<svelte:head>
  <title>TaimTendens | Attendance</title>
</svelte:head>
