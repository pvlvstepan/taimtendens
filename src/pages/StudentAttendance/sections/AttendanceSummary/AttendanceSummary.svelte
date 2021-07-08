<script>
  import Card from '../../../../Components/Card/Card.svelte';
  import { Button } from 'svelte-materialify';
  import AttendanceModal from '../../../../Components/AttendanceModal/AttendanceModal.svelte';

  let active = false;

  function open() {
    active = true;
  }
  function close() {
    active = false;
  }
</script>

<Card>
  <svelte:fragment slot="card_title">Attendance Summary</svelte:fragment>

  <div slot="card_body" class="overall">
    <h6>Overall Intake Attendance</h6>
    <h3>75.69%</h3>
  </div>
  <div class="button_wrapper" slot="card_footer">
    <Button class="primary-color" style="flex: 1" on:click={open}
      >Sign Attendance</Button>
      </div>
    
</Card>
<AttendanceModal {active} {close} />
<style>

  .overall h3 {
  text-align:center;
  color:green;
  }

  .overall h6 {
    text-align: center;
  }

  .button_wrapper {
    width: 100%;
    display: flex;   
    justify-content: center; 
    align-items: center;
  }
</style>