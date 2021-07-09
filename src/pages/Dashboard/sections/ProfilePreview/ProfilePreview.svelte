<script>
  import Card from '../../../../Components/Card/Card.svelte';
  import { Button, Avatar, Icon } from 'svelte-materialify';
  import { tabValue, signAttendanceIsOpen } from '../../../../store/store';
  import {
    mdiAccountCog,
    mdiExitToApp,
    mdiTimetable,
    mdiCheckboxMultipleMarkedCircle,
  } from '@mdi/js';
</script>

<Card>
  <div class="Avatar">
    <Avatar size="80px" class="primary-color">JM</Avatar>
  </div>
  <div>
    <h5 class="text-h5 text-center">Joe Mamah</h5>
  </div>

  <h6 class="text-subtitle-1 text-center text--secondary">
    TP0XXXXX | UCDF1909ICT(SE)
  </h6>

  <div class="button_wrapper">
    <Button icon class="grey-text" size="x-large">
      <Icon path={mdiAccountCog} size="30px" />
    </Button>
    <Button icon class="red-text" size="x-large">
      <Icon path={mdiExitToApp} size="30px" />
    </Button>
  </div>
  <div class="button_wrapper">
    <Button
      class="primary-color"
      style="flex: 1"
      on:click={() => signAttendanceIsOpen.set(true)}
    >
      Sign Attendance
      <Icon path={mdiCheckboxMultipleMarkedCircle} class="ml-1" />
    </Button>
    <Button
      class="primary-color"
      style="flex: 1"
      on:click={() => tabValue.set(2)}
    >
      View Timetable
      <Icon path={mdiTimetable} class="ml-1" />
    </Button>
  </div></Card
>

<style>
  .button_wrapper {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    column-gap: 15px;
  }

  .Avatar {
    font-size: 30pt;
    align-items: center;
    text-align: center;
  }
</style>
