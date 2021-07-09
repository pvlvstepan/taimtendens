<script>
  import Card from '../../../../Components/Card/Card.svelte';
  import { mdiCheckboxMultipleMarkedCircle } from '@mdi/js';
  import { signAttendanceIsOpen } from '../../../../store/store.js';
  import { Button, Icon } from 'svelte-materialify';
</script>

<Card>
  <svelte:fragment slot="card_title">Attendance Summary</svelte:fragment>
  <div slot="card_body">
    <h6 class="text-h6 text-center">Overall Intake Attendance</h6>
    <h3 class="text-h3 text-center red-text mb-3 mt-3">75.69%</h3>
    <h6 class="text-body-1 text-center text--secondary">
      Your attendance is lower than 80%. Consider submitting EC to admin.
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
  .button_wrapper {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
