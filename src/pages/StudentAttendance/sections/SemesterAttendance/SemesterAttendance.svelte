<script>
  import { mdiInformationOutline, mdiChartDonut } from '@mdi/js';
  import Card from '../../../../components/Card/Card.svelte';
  import { Button, Icon } from 'svelte-materialify';
  import ListItem from '../../../../components/ListItem/ListItem.svelte';
  export let semesterID;
</script>

<Card>
  <svelte:fragment slot="card_title">{'Semester ' + semesterID}</svelte:fragment
  >
  <svelte:fragment slot="card_body">
    <div class="col_items small space">
      <div class="col_items">
        <ListItem>
          <svelte:fragment slot="body_title"
            >Software Development Project</svelte:fragment
          >
          <div class="space-between" slot="body_alt">
            <div class="el-row_items green-text">
              <Icon path={mdiChartDonut} size="16px" />
              9/9 Classes (100%)
            </div>
            <span
              >Exam Eligibility: <span class="data-element red-text">***</span
              ></span
            >
          </div>
          <svelte:fragment slot="right_element">
            <Button icon on:click={() => alert('Attendance Details')}>
              <Icon path={mdiInformationOutline} />
            </Button>
          </svelte:fragment>
        </ListItem>
      </div>
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
  .col_items.small {
    flex: none;
  }
  .space-between {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
  .col_items.space {
    justify-content: space-between;
  }
</style>
