<script>
  import Card from '../../../../components/Card/Card.svelte';
  import { mdiCheckboxMultipleMarkedCircle } from '@mdi/js';
  import { signAttendanceIsOpen } from '../../../../store/store.js';
  import { Button, Icon } from 'svelte-materialify';
  import AttendanceChart from '../../../../components/AttendanceChart/AttendanceChart.svelte';

  const attendance = 85.25;
</script>

<Card>
  <svelte:fragment slot="card_title">Attendance Summary</svelte:fragment>
  <div slot="card_body">
    <h6 class="text-h6 text-center">Overall Intake Attendance</h6>
    <div class="chart-wrapper">
      <AttendanceChart {attendance} id={1} />
    </div>
    <h6 class="text-body-1 text-center text--secondary">
      {#if attendance >= 80}
        Your attendance is looking good! Keep up the good work.
      {:else}
        Your attendance is lower than 80%. Consider submitting EC to admin.
      {/if}
    </h6>
  </div>
  <div class="button_wrapper" slot="card_footer">
    <Button
      class="primary-color"
      on:click={() => signAttendanceIsOpen.set(true)}
    >
      Sign Attendance
      <Icon path={mdiCheckboxMultipleMarkedCircle} class="ml-1" />
    </Button>
  </div>
</Card>

<style>
  .chart-wrapper {
    max-width: 300px;
    max-height: 300px;
    margin: auto auto;
  }
  .button_wrapper {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
