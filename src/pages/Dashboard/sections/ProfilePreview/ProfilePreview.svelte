<script>
  import Card from '../../../../Components/Card/Card.svelte';

  import { Button } from 'svelte-materialify';
</script>

<Card>
  <div>
    <h5>Joe Mamah</h5>
  </div>
  <div class="button_wrapper">
    <Button class="primary-color" style="flex: 1">Sign Attendance</Button>
    <Button class="primary-color" style="flex: 1">View Timetable</Button>
  </div>
</Card>

<style lang="scss">
  .button_wrapper {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    column-gap: 15px;
  }
</style>
