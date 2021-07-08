<script>
  import Card from "../../../../Components/Card/Card.svelte";

  import { Button, Avatar, Icon } from "svelte-materialify";
  import AttendanceModal from "../../../../Components/AttendanceModal/AttendanceModal.svelte";
  import { tabValue } from "../../../../store/store";
  import { mdiAccountCog, mdiExitToApp } from "@mdi/js";
  let active = false;

  function open() {
    active = true;
  }
  function close() {
    active = false;
  }
</script>

<Card>
  <div class="Avatar">
    <Avatar size="80px" class="primary-color">JM</Avatar>
  </div>
  <div>
    <h5 class="text-h5 text-center">Joe Mamah</h5>
  </div>

  <h6 class="text-subtitle-1 text-center">TP0XXXXX | UCDF1909ICT(SE)</h6>

  <div class="button_wrapper">
    <Button icon class="grey-text">
      <Icon path={mdiAccountCog} />
    </Button>
    <Button icon class="red-text">
      <Icon path={mdiExitToApp} />
    </Button>
  </div>
  <div class="button_wrapper">
    <Button class="primary-color" style="flex: 1" on:click={open}
      >Sign Attendance</Button
    >
    <Button
      class="primary-color"
      style="flex: 1"
      on:click={() => tabValue.set(2)}>View Timetable</Button
    >
  </div></Card
>
<AttendanceModal {active} {close} />

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
