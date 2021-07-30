<script context="module">
  export async function preload(page, session) {
    if (!session.isLoggedIn) {
      return this.redirect(302, 'login');
    }

    const results = await this.fetch('intakes/intakes.json', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });

    const intakes = await results.json();

    const results2 = await this.fetch('intakes/intake_modules.json', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });

    const intake_modules = await results2.json();

    const results3 = await this.fetch('intakes/modules.json', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });

    const modules = await results3.json();

    return {
      intakes: intakes,
      intake_modules: intake_modules,
      modules: modules,
    };
  }
</script>

<script>
  import CardWrapper from '../../components/CardWrapper/CardWrapper.svelte';
  import IntakeView from './sections/IntakeView/index.svelte';
  import IntakeAdd from './sections/IntakeAdd/index.svelte';

  export let intakes = [];
  export let intake_modules = [];
  export let modules = [];

  let intakeAddisOpen = false,
    intakeEditIsOpen = false;
  let editingIntake;
</script>

<svelte:head>TaimTendens | Intakes</svelte:head>

<CardWrapper>
  <IntakeView
    {intakes}
    {intake_modules}
    bind:intakeAddisOpen
    bind:intakeEditIsOpen
    bind:editingIntake
  />
  {#if intakeAddisOpen}
    <IntakeAdd bind:active={intakeAddisOpen} {modules} />
  {/if}
</CardWrapper>
