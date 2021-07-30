<script context="module">
  export async function preload(page, session) {
    if (!session.isLoggedIn) {
      return this.redirect(302, 'login');
    }

    const results = await this.fetch('modules/modules.json', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });

    const modules = await results.json();

    const results2 = await this.fetch('modules/intake_modules.json', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });

    const intake_modules = await results2.json();

    return {
      modules: modules,
      intake_modules: intake_modules,
    };
  }
</script>

<script>
  import CardWrapper from '../../components/CardWrapper/CardWrapper.svelte';
  import ModuleView from './sections/ModuleView/index.svelte';
  import ModuleAdd from './sections/ModuleAdd/index.svelte';
  import ModuleEdit from './sections/ModuleEdit/index.svelte';

  export let modules = [];
  export let intake_modules = [];

  let moduleAddisOpen = false,
    moduleEditIsOpen = false;

  let editingModule;
</script>

<svelte:head>
  <title>TaimTendens | Modules</title>
</svelte:head>

<CardWrapper>
  <ModuleView
    {modules}
    {intake_modules}
    bind:moduleAddisOpen
    bind:moduleEditIsOpen
    bind:editingModule
  />
  {#if moduleAddisOpen}
    <ModuleAdd bind:active={moduleAddisOpen} />
  {/if}
  {#if moduleEditIsOpen}
    <ModuleEdit bind:active={moduleEditIsOpen} item={editingModule} />
  {/if}
</CardWrapper>
