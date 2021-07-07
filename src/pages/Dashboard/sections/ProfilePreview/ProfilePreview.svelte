<script>
  import Card from '../../../../Components/Card/Card.svelte';

  import { Button, Avatar, MaterialApp } from 'svelte-materialify';
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

  <MaterialApp>
    <div class="Avatar">
      <Avatar size="80px" class="primary-color">JM</Avatar>
    </div>
    </MaterialApp>
  
  <div>
    <h5 class= "h5">Joe Mamah</h5>
  </div>

  <h6 class="h6">TP0XXXXX | UCDF1909ICT(SE)</h6>

<h7 class="h7">buttons here</h7>

  <div class="button_wrapper">
    <Button class="primary-color" style="flex: 1" on:click={open}
      >Sign Attendance</Button
    >
    <Button
      class="primary-color"
      style="flex: 1"
      on:click={() => tabValue.set(2)}>View Timetable</Button
    >
  
</Card>
<AttendanceModal {active} {close} />

<style>
  .button_wrapper {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    column-gap: 20px;
  }

  .Avatar{
    font-size: 30pt;
    align-items: center;
    text-align: center;
  }

  .h5{
    font-size: 20pt;
    text-align: center;
  }

  .h6{
    font-size: 13pt;
    text-align: center;
  }

  .h7{
    text-align: center;
  }
</style>
