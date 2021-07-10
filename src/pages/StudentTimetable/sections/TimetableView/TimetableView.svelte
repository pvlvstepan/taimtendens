<script>
  import Card from '../../../../Components/Card/Card.svelte';
  import Tabs from '../../../../Components/Tabs/Tabs.svelte';
  import ListItem from '../../../../Components/ListItem/ListItem.svelte';
  import { Window, WindowItem, Select, Icon } from 'svelte-materialify';
  import {
    mdiAccountCircle,
    mdiClockOutline,
    mdiMapMarkerRadiusOutline,
  } from '@mdi/js';

  const tabs = [
    { id: 0, label: 'Monday' },
    { id: 1, label: 'Tuesday' },
    { id: 2, label: 'Wednesday' },
    { id: 3, label: 'Thursday' },
    { id: 4, label: 'Friday' },
  ];

  const intakes = ['UCDF1909ICT(SE)', 'UCDF2009ICT(SE)'];

  let currentTab = 0;

  const changeTab = e => {
    currentTab = e.detail.id;
  };
</script>

<Card>
  <svelte:fragment slot="card_title">Timetable</svelte:fragment>
  <svelte:fragment slot="card_body">
    <Select items={intakes} outlined value={intakes[0]}>Intake</Select>
    <Tabs {tabs} {currentTab} on:change={changeTab} full />
    <Window value={currentTab}>
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
</Card>

<style>
  .el-row_items {
    display: flex;
    align-items: center;
    column-gap: 8px;
  }
  .col_items {
    display: flex;
    flex-direction: column;
    row-gap: 8px;
  }
</style>
