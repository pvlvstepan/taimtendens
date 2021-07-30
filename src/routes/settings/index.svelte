<script context="module">
  export async function preload(page, session) {
    if (!session.isLoggedIn) {
      return this.redirect(302, 'login');
    }

    const { token } = session;

    const resultUsers = await this.fetch('settings/user.json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ token: token }),
    });

    const user = await resultUsers.json();

    const res1 = await this.fetch('settings/intake.json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ intake: user[0].intake_id, active: 1 }),
    });

    const activeModules = await res1.json();

    const res2 = await this.fetch('settings/intake.json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ intake: user[0].intake_id, active: 0 }),
    });

    const inactiveModules = await res2.json();

    const res3 = await this.fetch('settings/intake_lecturer.json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ module_id: user[0].module_id }),
    });

    const lecturer_intakes = await res3.json();

    return {
      user: user[0],
      activeModules: activeModules,
      inactiveModules: inactiveModules,
      lecturer_intakes: lecturer_intakes,
    };
  }
</script>

<script>
  import { Button, Icon } from 'svelte-materialify/src';
  import { goto } from '@sapper/app';
  import CardWrapper from '../../components/CardWrapper/CardWrapper.svelte';
  import UserDetails from './sections/UserDetails/index.svelte';
  import ChangeEmail from './sections/ChangeEmail/index.svelte';
  import ChangePassword from './sections/ChangePassword/index.svelte';

  export let user;
  export let activeModules = [];
  export let inactiveModules = [];
  export let lecturer_intakes = [];
</script>

<svelte:head>TaimTendens | Settings</svelte:head>

<CardWrapper>
  <Button text on:click={() => goto('dashboard')} style="margin-right: auto">
    <Icon class="mdi mdi-arrow-left mr-1" />
    Back to dashboard
  </Button>
  <UserDetails {user} {activeModules} {inactiveModules} {lecturer_intakes} />
  <ChangeEmail {user} />
  <ChangePassword {user} />
</CardWrapper>
