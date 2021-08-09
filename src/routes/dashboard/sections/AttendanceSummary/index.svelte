<script>
  import Card from '../../../../components/Card/Card.svelte';
  import { Button, Icon } from 'svelte-materialify/src';
  import { signAttendanceIsOpen } from '../../../../stores';
  import ListItem from '../../../../components/ListItem/ListItem.svelte';
  import { goto } from '@sapper/app';
  import AttendanceChart from '../../../../components/AttendanceChart/AttendanceChart.svelte';

  export let attendance, user;

  let processedData;
  let total = 0;

  const processData = () => {
    total = 0;
    let totalClasses = 0;
    let totalStudents = 0;
    let students = 0;

    attendance.length > 0 &&
      attendance.map(record => {
        students = record.total_students = record.total_students || 0;
        const attended = (record.attended = record.attended || 0);
        let attendance = 0;
        if (user.role_id === 0) {
          attendance = (attended / record.total_classes) * 100;
        } else {
          attendance = (attended / (record.total_classes * students)) * 100;
        }
        record.attended = attended;
        record.attendance = attendance || 0;
        record.active = !!record.active;

        total += record.attendance;
        totalClasses += record.total_classes;
        totalStudents += students;
      });
    processedData = attendance;

    if (user.role_id === 0) {
      total = (total / totalClasses).toFixed(2);
    } else {
      total = (total / (totalClasses * totalStudents)).toFixed(2);
    }
  };

  $: attendance, processData();
</script>

<Card>
  <svelte:fragment slot="card_title">Attendance Summary</svelte:fragment>

  <svelte:fragment slot="card_body">
    <div class="row_items">
      <div class={`col_items space ${user.role_id === 1 && 'sm'}`}>
        <AttendanceChart attendance={total} id={2} />
        {#if user.role_id === 1}
          <h6 class="text-h6 text-center">Overall module attendance</h6>
        {/if}
        {#if user.role_id !== 1}
          <Button
            block
            class="primary-color"
            on:click={() => signAttendanceIsOpen.set(true)}
          >
            Sign Attendance
            <Icon class="mdi mdi-checkbox-multiple-marked-circle ml-1" />
          </Button>
        {/if}
      </div>
      {#if user.role_id !== 1}
        <div class="col_items">
          {#if processedData}
            {#each attendance as record}
              {#if record.active === true}
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
      {/if}
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
  .col_items.space.sm {
    text-align: center;
    max-width: 60%;
    margin: 0 auto;
  }
  .button_wrapper {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
</style>
