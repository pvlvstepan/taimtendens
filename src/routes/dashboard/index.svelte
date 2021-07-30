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

    let today = new Date();
    let tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    today = today.toISOString().slice(0, 10).replace('T', ' ');
    tomorrow = tomorrow.toISOString().slice(0, 10).replace('T', ' ');

    const user = await resultUsers.json();

    const resultTimetableToday = await this.fetch(
      `dashboard/timetable${user[0].role_id !== 0 ? '_lecturer' : ''}.json`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          intake: user[0].intake_id,
          date: today,
          module_id: user[0].module_id,
        }),
      }
    );

    const timetableToday = await resultTimetableToday.json();

    const resultTimetableTom = await this.fetch(
      `dashboard/timetable${user[0].role_id !== 0 ? '_lecturer' : ''}.json`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          intake: user[0].intake_id,
          date: tomorrow,
          module_id: user[0].module_id,
        }),
      }
    );

    const timetableTomorrow = await resultTimetableTom.json();

    const resAttendance = await this.fetch(
      `dashboard/attendance${user[0].role_id !== 0 ? '_lecturer' : ''}.json`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          intake_id: user[0].intake_id,
          user_tp: user[0].user_tp,
          module_id: user[0].module_id,
        }),
      }
    );

    const attendance = await resAttendance.json();

    return {
      user: user[0],
      timetableToday: timetableToday,
      timetableTomorrow: timetableTomorrow,
      attendance: attendance,
    };
  }
</script>

<script>
  import CardWrapper from '../../components/CardWrapper/CardWrapper.svelte';
  import ProfilePreview from './sections/ProfilePreview/index.svelte';
  import UpcomingClasses from './sections/UpcomingClasses/UpcomingClasses.svelte';
  import AttendanceSummary from './sections/AttendanceSummary/index.svelte';

  export let user = [];
  export let timetableToday = [];
  export let timetableTomorrow = [];
  export let attendance = [];
</script>

<svelte:head>
  <title>TaimTendens | Dashboard</title>
</svelte:head>

<CardWrapper>
  <ProfilePreview {user} />
  {#if user.role_id !== 2}
    <UpcomingClasses {timetableToday} {timetableTomorrow} />
    <AttendanceSummary {attendance} />
  {/if}
</CardWrapper>
