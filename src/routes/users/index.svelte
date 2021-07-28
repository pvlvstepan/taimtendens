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

    const allUsers = await this.fetch('users/users.json', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });

    const users = await allUsers.json();

    const allIntakes = await this.fetch('users/intake.json', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });

    const intakes = await allIntakes.json();

    const allModules = await this.fetch('users/module.json', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });

    const modules = await allModules.json();

    if (user && user[0].role_id !== 2) {
      return this.redirect(302, 'login');
    }

    return {
      users: users,
      modules: modules,
      intakes: intakes,
    };
  }
</script>

<script>
  import CardWrapper from '../../components/CardWrapper/CardWrapper.svelte';
  import UserView from './sections/UserView/index.svelte';
  import AddUser from './sections/AddUser/index.svelte';

  export let users, modules, intakes;

  let userAddIsOpen = false;
</script>

<svelte:head>
  <title>Dashboard</title>
</svelte:head>

<CardWrapper>
  <UserView {users} bind:userAddIsOpen />
  {#if userAddIsOpen}
    <AddUser bind:active={userAddIsOpen} {modules} {intakes} />
  {/if}
</CardWrapper>
