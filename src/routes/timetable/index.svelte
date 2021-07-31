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

    const intakeRes = await this.fetch('users/intake.json', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });

    const intakes = await intakeRes.json();

    return { user: user[0], intakes: intakes };
  }
</script>

<script>
  import { onMount } from 'svelte';
  import CardWrapper from '../../components/CardWrapper/CardWrapper.svelte';
  import TimetableView from './sections/TimetableView/TimetableView.svelte';
  import TimetableAdd from './sections/TimetableAdd/index.svelte';

  export let user;
  export let intakes = [];

  let timetable;
  let modules;
  let nextWeek = false;
  let isMounded = false;
  let timetableAddIsOpen = false;
  let currentIntake;

  const loadTimetable = async () => {
    if (isMounded) {
      const results = await fetch(
        `timetable/timetable${user.role_id === 1 ? '_lecturer' : ''}.json`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify({
            intake: user.role_id === 2 ? currentIntake : user.intake_id,
            nextWeek: nextWeek,
            module_id: user.module_id,
          }),
        }
      );
      timetable = await results.json();
    }
  };

  const loadModules = async () => {
    if (isMounded && timetableAddIsOpen) {
      const results = await fetch(`timetable/modules.json`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          intake_id: currentIntake,
        }),
      });
      modules = await results.json();
    }
  };

  $: nextWeek, currentIntake, isMounded, loadTimetable();
  $: timetableAddIsOpen, loadModules();

  onMount(() => {
    loadTimetable();
    isMounded = true;
  });

  let editingClass;
  let classEditIsOpen = false;
</script>

{#if timetable}
  <CardWrapper>
    <TimetableView
      {timetable}
      {user}
      {intakes}
      bind:nextWeek
      bind:currentIntake
      bind:timetableAddIsOpen
      bind:editingClass
      bind:classEditIsOpen
    />
    {#if timetableAddIsOpen}
      <TimetableAdd
        bind:active={timetableAddIsOpen}
        bind:currentIntake
        {intakes}
        {modules}
      />
    {/if}
  </CardWrapper>
{/if}

<svelte:head>
  <title>TaimTendens | Timetable</title>
</svelte:head>
