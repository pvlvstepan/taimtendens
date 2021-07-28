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
        'Accept': 'application/json',
      },
      body: JSON.stringify({ token: token }),
    });

    const user = await resultUsers.json();

    const resAttendance = await this.fetch('attendance/attendance.json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        intake_id: user[0].intake_id,
        user_tp: user[0].user_tp,
      }),
    });

    const attendance = await resAttendance.json();

    return {
      attendance: attendance,
    };
  }
</script>

<script>
  import CardWrapper from '../../components/CardWrapper/CardWrapper.svelte';
  import AttendanceSummary from './sections/AttendanceSummary/index.svelte';
  import AttendanceLegends from './sections/AttendanceLegends/index.svelte';
  import AttendanceView from './sections/AttendanceView/index.svelte';

  export let attendance;

  let processedData;
  let total = 0;

  const processData = () => {
    attendance.map(record => {
      const attended = (record.attended = record.attended || 0);
      const attendance = (attended / record.total_classes) * 100;
      record.attended = attended;
      record.attendance = attendance;
      record.active = !!record.active;

      total += attendance;
    });
    processedData = attendance;

    total = (total / attendance.length).toFixed(2);
  };

  $: attendance, processData();
</script>

<CardWrapper>
  <AttendanceSummary attendance={total} />
  <AttendanceView current={true} attendance={processedData} />
  <AttendanceView current={false} attendance={processedData} />
  <AttendanceLegends />
</CardWrapper>

<svelte:head>
  <title>Attendance</title>
</svelte:head>
