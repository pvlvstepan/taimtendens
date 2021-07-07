<script>
  import Card from '../../../../Components/Card/Card.svelte';

  import { Button } from 'svelte-materialify';
  import AttendanceModal from '../../../../Components/AttendanceModal/AttendanceModal.svelte';
  import { tabValue } from '../../../../store/store';

  let active = false;

  function open() {
    active = true;
  }
  function close() {
    active = false;
  }
</script>

<Card>
  <div>
    <h5 class= "h5">Joe Mamah</h5>
  </div>

  <h6 class="h6">TP0XXXXX | UCDF1909ICT(SE)</h6>

  <div class="button_wrapper">
    <Button class="primary-color" style="flex: 1" on:click={open}
      >Sign Attendance</Button
    >
    <Button
      class="primary-color"
      style="flex: 1"
      on:click={() => tabValue.set(2)}>View Timetable</Button
    >
  </div>
</Card>
<AttendanceModal {active} {close} />

<style lang="scss">
  .button_wrapper {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    column-gap: 15px;
  }

  .h5{
    font-size: 20pt;
    text-align: center;
  }

  .h6{
    font-size: 13pt;
    text-align: center;
  }
</style>
