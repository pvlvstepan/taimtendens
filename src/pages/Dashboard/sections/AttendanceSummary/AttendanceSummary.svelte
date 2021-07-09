<script>
  import { mdiArrowRight, mdiCheckboxMultipleMarkedCircle } from '@mdi/js';
  import Card from '../../../../Components/Card/Card.svelte';
  import { Button, Icon, Col, Row } from 'svelte-materialify';
  import { tabValue, signAttendanceIsOpen } from '../../../../store/store';
  import ListItem from '../../../../Components/ListItem/ListItem.svelte';
</script>

<Card>
  <svelte:fragment slot="card_title">Attendance Summary</svelte:fragment>

  <svelte:fragment slot="card_body">
    <div class="row_items">
      <div class="col_items small space">
        <div class="graph" />
        <Button
          block
          class="primary-color"
          on:click={() => signAttendanceIsOpen.set(true)}
        >
          Sign Attendance
          <Icon path={mdiCheckboxMultipleMarkedCircle} class="ml-1" />
        </Button>
      </div>
      <div class="col_items">
        <ListItem>
          <svelte:fragment slot="body_title">MODULE 1</svelte:fragment>
          <div class="green-text" slot="body_alt">10/12 Classes (83%)</div>
        </ListItem>
        <ListItem>
          <svelte:fragment slot="body_title">MODULE 2</svelte:fragment>
          <div class="green-text" slot="body_alt">9/9 Classes (100%)</div>
        </ListItem>
        <ListItem>
          <svelte:fragment slot="body_title">MODULE 3</svelte:fragment>
          <div class="red-text" slot="body_alt">7/9 Classes (78%)</div>
        </ListItem>
        <ListItem>
          <svelte:fragment slot="body_title">MODULE 4</svelte:fragment>
          <div class="green-text" slot="body_alt">13/14 Classes (93%)</div>
        </ListItem>
        <ListItem>
          <svelte:fragment slot="body_title">MODULE 4</svelte:fragment>
          <div class="green-text" slot="body_alt">13/14 Classes (93%)</div>
        </ListItem>
      </div>
    </div>
  </svelte:fragment>
  <div class="button_wrapper" slot="card_footer">
    <Button text on:click={() => tabValue.set(1)}>
      View Attendance Report
      <Icon path={mdiArrowRight} class="ml-1" />
    </Button>
  </div>
</Card>

<style>
  .row_items {
    display: flex;
    align-items: center;
    column-gap: 15px;
  }
  .col_items {
    flex: 1;
    display: flex;
    flex-direction: column;
    row-gap: 8px;
  }
  .col_items.small {
    flex: none;
  }
  .col_items.space {
    justify-content: space-between;
  }
  .button_wrapper {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
</style>
