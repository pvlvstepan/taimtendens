<script>
  import {
    mdiArrowRight,
    mdiCheckboxMultipleMarkedCircle,
    mdiChartDonut,
  } from '@mdi/js';
  import Card from '../../../../components/Card/Card.svelte';
  import { Button, Icon } from 'svelte-materialify';
  import { tabValue, signAttendanceIsOpen } from '../../../../store/store';
  import ListItem from '../../../../components/ListItem/ListItem.svelte';
  import AttendanceChart from '../../../../components/AttendanceChart/AttendanceChart.svelte';
</script>

<Card>
  <svelte:fragment slot="card_title">Attendance Summary</svelte:fragment>

  <svelte:fragment slot="card_body">
    <div class="row_items">
      <div class="col_items space">
        <AttendanceChart attendance={85.25} id={2} />
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
          <div class="el-row_items green-text" slot="body_alt">
            <Icon path={mdiChartDonut} size="16px" />
            9/9 Classes (100%)
          </div>
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
  .el-row_items {
    display: flex;
    align-items: center;
    column-gap: 8px;
  }
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
  .col_items.space {
    justify-content: space-between;
  }
  .button_wrapper {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
</style>
