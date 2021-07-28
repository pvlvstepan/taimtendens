<script>
  import Card from '../../../../components/Card/Card.svelte';
  import { Button, Icon } from 'svelte-materialify/src';
  import ListItem from '../../../../components/ListItem/ListItem.svelte';

  export let current;
  export let attendance;
</script>

<Card>
  <svelte:fragment slot="card_title"
    >{current === true ? 'Current' : 'Past'} modules</svelte:fragment
  >
  <svelte:fragment slot="card_body">
    <div class="col_items">
      {#if attendance && attendance.length > 0}
        {#each attendance as record}
          {#if record.active === current}
            <ListItem>
              <svelte:fragment slot="body_title"
                >{record.module_name} ({record.module_id})</svelte:fragment
              >
              <div class="space-between" slot="body_alt">
                <div
                  class={`el-row_items ${
                    record.attendance > 80 ? 'green-text' : 'red-text'
                  }`}
                >
                  <Icon class="mdi mdi-chart-donut" size="16px" />
                  {record.attended}/{record.total_classes} Classes ({record.attendance.toFixed(
                    2
                  )}%)
                </div>
                <span
                  >Exam Eligibility: <span
                    class={`data-element ${
                      record.attendance > 80 ? 'green-text' : 'red-text'
                    }`}>{record.attendance > 80 ? 'OK' : 'BA'}</span
                  ></span
                >
              </div>
            </ListItem>
          {/if}
        {/each}
      {:else}
        No attendance records were found
      {/if}
    </div>
  </svelte:fragment>
</Card>

<style>
  .el-row_items {
    display: flex;
    align-items: center;
    column-gap: 8px;
  }
  .col_items {
    flex: 1;
    display: flex;
    flex-direction: column;
    row-gap: 8px;
  }
  .space-between {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
</style>
