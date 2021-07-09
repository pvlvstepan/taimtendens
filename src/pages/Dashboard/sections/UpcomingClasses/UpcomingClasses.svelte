<script>
  import ListItem from '../../../../components/ListItem/ListItem.svelte';
  import Card from '../../../../components/Card/Card.svelte';
  import { Button, Icon, Window, WindowItem } from 'svelte-materialify';
  import {
    mdiArrowRight,
    mdiCalendarToday,
    mdiCalendar,
    mdiClockOutline,
    mdiMapMarkerRadiusOutline,
    mdiAccountCircle,
  } from '@mdi/js';
  import Tabs from '../../../../components/Tabs/Tabs.svelte';
  import { tabValue } from '../../../../store/store';

  const tabs = [
    {
      id: 0,
      label: 'Today',
      icon: mdiCalendarToday,
    },
    {
      id: 1,
      label: 'Tomorrow',
      icon: mdiCalendar,
    },
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
          <ListItem>
            <svelte:fragment slot="left_element" />
            <svelte:fragment slot="body_title"
              >Managing Business (MBUS-4-1-KJO)</svelte:fragment
            >
            <div class="green-text row_items" slot="body_content">
              <Icon path={mdiClockOutline} size="16px" />
              8:30AM - 10:30AM
            </div>
            <div class="row_items" slot="body_alt">
              <Icon path={mdiMapMarkerRadiusOutline} size="16px" />
              Microsoft Teams
            </div>
            <div class="row_items blue-text" slot="right_element">
              <Icon path={mdiAccountCircle} size="16px" />
              Dr. Killjoy
            </div>
          </ListItem>
        </div>
      </WindowItem>
      <WindowItem>
        <div class="col_items">
          <ListItem>
            <svelte:fragment slot="left_element" />
            <svelte:fragment slot="body_title"
              >Java Programming (JP-4-1-YR)</svelte:fragment
            >
            <div class="green-text el-row_items" slot="body_content">
              <Icon path={mdiClockOutline} size="16px" />
              8:30AM - 10:30AM
            </div>
            <div class="el-row_items" slot="body_alt">
              <Icon path={mdiMapMarkerRadiusOutline} size="16px" />
              Microsoft Teams
            </div>
            <div class="el-row_items blue-text" slot="right_element">
              <Icon path={mdiAccountCircle} size="16px" />
              Dr. Yoru
            </div>
          </ListItem>
        </div>
      </WindowItem>
    </Window>
  </svelte:fragment>
  <div class="button_wrapper" slot="card_footer">
    <Button text on:click={() => tabValue.set(2)}>
      Weekly Schedule
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
