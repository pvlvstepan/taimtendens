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

    return { user: user[0] };
  }
</script>

<script>
  import { onMount } from 'svelte';
  import CardWrapper from '../../components/CardWrapper/CardWrapper.svelte';
  import TimetableView from './sections/TimetableView/TimetableView.svelte';

  export let user;

  let timetable;
  let nextWeek = false;
  let isMounded = false;

  const loadTimetable = async () => {
    if (isMounded) {
      const results = await fetch(
        `timetable/timetable${user.role_id !== 0 ? '_lecturer' : ''}.json`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify({
            intake: user.intake_id,
            nextWeek: nextWeek,
            module_id: user.module_id,
          }),
        }
      );
      timetable = await results.json();
    }
  };

  $: nextWeek, isMounded, loadTimetable();

  onMount(() => {
    loadTimetable();
    isMounded = true;
  });
</script>

{#if timetable}
  <CardWrapper>
    <TimetableView {timetable} bind:nextWeek />
  </CardWrapper>
{/if}

<svelte:head>
  <title>TaimTendens | Timetable</title>
</svelte:head>
