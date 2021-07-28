<script>
  import Card from '../../../../components/Card/Card.svelte';
  import { Button, Icon } from 'svelte-materialify/src';
  import { signAttendanceIsOpen } from '../../../../stores';
  import ListItem from '../../../../components/ListItem/ListItem.svelte';
  import { goto } from '@sapper/app';
  import AttendanceChart from '../../../../components/AttendanceChart/AttendanceChart.svelte';

  export let attendance;

  let processedData;
  let total = 0;

  const processData = () => {
    attendance.map(record => {
      const attended = (record.attended = record.attended || 0);
      const attendance = (attended / record.total_classes) * 100;
      record.attended = attended;
      record.attendance = attendance;

      total += attendance;
    });
    processedData = attendance;

    total = (total / attendance.length).toFixed(2);
  };

  $: attendance, processData();
</script>

<Card>
  <svelte:fragment slot="card_title">Attendance Summary</svelte:fragment>

  <svelte:fragment slot="card_body">
    <div class="row_items">
      <div class="col_items space">
        <AttendanceChart attendance={total} id={2} />
        <Button
          block
          class="primary-color"
          on:click={() => signAttendanceIsOpen.set(true)}
        >
          Sign Attendance
          <Icon class="mdi mdi-checkbox-multiple-marked-circle ml-1" />
        </Button>
      </div>
      <div class="col_items">
        {#if processedData}
          {#each attendance as record}
            {#if record.active === 1}
              <ListItem>
                <svelte:fragment slot="body_title"
                  >{record.module_name}</svelte:fragment
                >
                <div
                  class={`el-row_items ${
                    record.attendance > 80 ? 'green-text' : 'red-text'
                  }`}
                  slot="body_alt"
                >
                  <Icon class="mdi mdi-chart-donut" size="16px" />
                  {record.attended}/{record.total_classes} Classes ({record.attendance.toFixed(
                    2
                  )}%)
                </div>
              </ListItem>
            {/if}
          {/each}
        {:else}
          No attendance records were found
        {/if}
      </div>
    </div>
  </svelte:fragment>
  <div class="button_wrapper" slot="card_footer">
    <Button text on:click={() => goto('attendance')}>
      View Attendance Report
      <Icon class="mdi mdi-arrow-right ml-1" />
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
