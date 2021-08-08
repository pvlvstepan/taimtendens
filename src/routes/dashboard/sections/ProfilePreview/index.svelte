<script>
  import Card from '../../../../components/Card/Card.svelte';
  import ConfrimModal from '../../../../components/ConfirmModal/index.svelte';
  import { Button, Avatar, Icon } from 'svelte-materialify/src';
  import { goto } from '@sapper/app';
  import { signAttendanceIsOpen } from '../../../../stores';

  let active = false;

  export let user;
</script>

<Card>
  <div class="profile_wrapper">
    <div class="avatar_wrapper">
      <Avatar
        size="120px"
        class="primary-color text-center text-h2 elevation-4"
      >
        {#if user.profile_pic && user.profile_pic !== ''}
          <img
            src={user.profile_pic}
            alt="Avatar"
            style="object-fit: cover; width: 115px; height: 115px"
          />
        {:else}
          {`${user.first_name.charAt(0)}${user.last_name.charAt(0)}`}
        {/if}
      </Avatar>
    </div>
    <div class="profile_details">
      <div class="text-body-1">Welcome Back,</div>
      <h4 class="text-h4 text-center">
        {`${user.first_name} ${user.last_name}`}
      </h4>
      <h6 class="text-subtitle-1 text-center text--secondary">
        TP{user.user_tp}
        {user.role_id !== 2 ? `| ${user.intake_id || user.module_id}` : ''}
      </h6>
    </div>
    <div class="button_wrapper col">
      <Button
        icon
        class="grey-text"
        size="x-large"
        on:click={() => goto('settings')}
      >
        <Icon class="mdi mdi-account-cog" size="30px" />
      </Button>
      <Button
        icon
        class="red-text"
        size="x-large"
        on:click={() => (active = true)}
      >
        <Icon class="mdi mdi-exit-to-app" size="30px" />
      </Button>
    </div>
  </div>
  <div class="button_wrapper">
    <Button
      class="primary-color"
      style="flex: 1"
      on:click={user.role_id !== 0
        ? () => goto('attendance')
        : () => signAttendanceIsOpen.set(true)}
    >
      Sign Attendance
      <Icon class="mdi mdi-checkbox-multiple-marked-circle ml-1" />
    </Button>
    <Button
      class="primary-color"
      style="flex: 1"
      on:click={() => goto('timetable')}
    >
      View Timetable
      <Icon class="mdi mdi-timetable ml-1" />
    </Button>
  </div>
  {#if user.role_id === 2}
    <div class="button_wrapper">
      <Button
        class="primary-color"
        style="flex: 1"
        on:click={() => goto('users')}
      >
        Users
      </Button>
      <Button
        class="primary-color"
        style="flex: 1"
        on:click={() => goto('intakes')}
      >
        Intakes
      </Button>
      <Button
        class="primary-color"
        style="flex: 1"
        on:click={() => goto('modules')}
      >
        Modules
      </Button>
    </div>
  {/if}
</Card>

<ConfrimModal
  bind:active
  action={() => goto('logout')}
  message={'Are you sure you want to log out?'}
/>

<style>
  .profile_wrapper {
    display: flex;
    align-items: center;
    justify-content: start;
    flex-direction: row;
    column-gap: 30px;
    padding: 16px;
    border-radius: 8px;
    background-color: var(--theme-app-bar);
  }
  .profile_details {
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    row-gap: 10px;
    height: 100%;
    flex: 75%;
  }
  .button_wrapper {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    column-gap: 15px;
  }
  .button_wrapper.col {
    flex-direction: column;
    row-gap: 15px;
    flex: 15%;
  }
  .avatar_wrapper {
    align-items: center;
    flex: auto;
  }
</style>
