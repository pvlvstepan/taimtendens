<script>
  import ListItem from '../../../../components/ListItem/ListItem.svelte';
  import Card from '../../../../components/Card/Card.svelte';
  import { Button, Icon, Window, WindowItem } from 'svelte-materialify/src';
  import { goto } from '@sapper/app';
  import Tabs from '../../../../components/Tabs/Tabs.svelte';

  import tConvert from '../../../../utils/convertTime';

  export let timetableTomorrow;
  export let timetableToday;

  const tabs = [
    {
      id: 0,
      label: 'Today',
      icon: 'mdi-calendar-today'
    },
    {
      id: 1,
      label: 'Tomorrow',
      icon: 'mdi-calendar'
    }
  ];

  let currentTab = 0;

  const changeTab = e => {
    currentTab = e.detail.id;
  };
</script>

<Card>
  <svelte:fragment slot="card_title">Upcoming Classes</svelte:fragment>
  <svelte:fragment slot="card_body">
    <Tabs {tabs} {currentTab} on:change={changeTab} full />
    <Window value={currentTab}>
      <WindowItem>
        <div class="col_items">
          {#if timetableToday.length > 0}
            {#each timetableToday as today}
              <ListItem>
                <svelte:fragment slot="left_element" />
                <svelte:fragment slot="body_title"
                  >{today.module_name || today.intake_id} ({today.module_id})</svelte:fragment
                >
                <div class="green-text row_items" slot="body_content">
                  <Icon class="mdi mdi-clock-outline" size="16px" />
                  {tConvert(
                    today.time_start.slice(0, today.time_start.length - 3)
                  )} - {tConvert(
                    today.time_end.slice(0, today.time_end.length - 3)
                  )}
                </div>
                <div class="row_items" slot="body_alt">
                  <Icon class="mdi mdi-map-marker-radius-outline" size="16px" />
                  {today.location}
                </div>
              </ListItem>
            {/each}
          {:else}
            <div class="no-classes">
              <h6>No classes for today</h6>
            </div>
          {/if}
        </div>
      </WindowItem>
      <WindowItem>
        <div class="col_items">
          {#if timetableTomorrow.length > 0}
            {#each timetableTomorrow as tomorrow}
              <ListItem>
                <svelte:fragment slot="left_element" />
                <svelte:fragment slot="body_title"
                  >{tomorrow.module_name || tomorrow.intake_id} ({tomorrow.module_id})</svelte:fragment
                >
                <div class="green-text row_items" slot="body_content">
                  <Icon class="mdi mdi-clock-outline" size="16px" />
                  {tConvert(
                    tomorrow.time_start.slice(0, tomorrow.time_start.length - 3)
                  )} - {tConvert(
                    tomorrow.time_end.slice(0, tomorrow.time_end.length - 3)
                  )}
                </div>
                <div class="row_items" slot="body_alt">
                  <Icon class="mdi mdi-map-marker-radius-outline" size="16px" />
                  {tomorrow.location}
                </div>
              </ListItem>
            {/each}
          {:else}
            <div class="no-classes">
              <h6>No classes for tomorrow</h6>
            </div>
          {/if}
        </div>
      </WindowItem>
    </Window>
  </svelte:fragment>
  <div class="button_wrapper" slot="card_footer">
    <Button text on:click={() => goto('timetable')}>
      Weekly Schedule
      <Icon class="mdi mdi-arrow-right ml-1" />
    </Button>
  </div>
</Card>

<style>
  .no-classes {
    height: 150px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .no-classes h6 {
    margin: auto 0;
  }
  .col_items {
    flex: 1;
    display: flex;
    flex-direction: column;
    row-gap: 8px;
  }
  .button_wrapper {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
</style>
