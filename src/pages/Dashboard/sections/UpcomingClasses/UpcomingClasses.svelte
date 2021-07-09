<script>
  import ListItem from '../../../../components/ListItem/ListItem.svelte';
  import Card from '../../../../components/Card/Card.svelte';
  import { Button, Icon, Window, WindowItem } from 'svelte-materialify';
  import {
    mdiArrowRight,
    mdiCalendarToday,
    mdiCalendar,
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
    <div class="row_items">
      <div class="col_items space">
    <Tabs {tabs} {currentTab} on:change={changeTab} full />
    <Window value={currentTab}>
      <WindowItem>
        <div class="col_items">
        <ListItem>
          <svelte:fragment slot="left_element"></svelte:fragment>
          <svelte:fragment slot="body_title">Managing Business</svelte:fragment>
          <div class="green-text" slot="body_content">8:30AM - 10:30AM</div>
          <div class="red-text" slot="body_alt">Microsoft Teams</div>
          <div class="blue-text" slot="right_element">Dr. Killjoy</div>
        </ListItem>

        <ListItem>
          <svelte:fragment slot="left_element"></svelte:fragment>
          <svelte:fragment slot="body_title">Discrete Mathematics</svelte:fragment>
          <div class="green-text" slot="body_content">11:00AM - 12:30PM</div>
          <div class="red-text" slot="body_alt">Microsoft Teams</div>
          <div class="blue-text" slot="right_element">Dr. Brimstone</div>
        </ListItem>

        <ListItem>
          <svelte:fragment slot="left_element"></svelte:fragment>
          <svelte:fragment slot="body_title" >Cyber Security</svelte:fragment>
          <div class="green-text" slot="body_content">2:00PM - 4:00PM</div>
          <div class="red-text" slot="body_alt">Microsoft Teams</div>
          <div class="blue-text" slot="right_element">Dr. Reyna</div>
        </ListItem>

        <ListItem>
          <svelte:fragment slot="left_element"> </svelte:fragment>
          <svelte:fragment slot="body_title">Computer System Architecture</svelte:fragment>
          <div class="green-text" slot="body_content">4:30PM - 5:30PM</div>
          <div class="red-text" slot="body_alt">Microsoft Teams</div>
          <div class="blue-text" slot="right_element">Dr. Phoenix</div>
        </ListItem>

        <ListItem>
          <svelte:fragment slot="left_element"></svelte:fragment>
          <svelte:fragment slot="body_title">Database System</svelte:fragment>
          <div class="green-text" slot="body_content">6:00PM - 8:00PM</div>
          <div class="red-text" slot="body_alt">Microsoft Teams</div>
          <div class="blue-text" slot="right_element">Dr. Breach</div>
        </ListItem>
      </div>
      </WindowItem>
      <WindowItem>

        <div class="col_items"> 
        <ListItem>
          <svelte:fragment slot="left_element"></svelte:fragment>
          <svelte:fragment slot="body_title">Java Programming</svelte:fragment>
          <div class="green-text" slot="body_content">9:00AM - 11:00AM</div>
          <div class="red-text" slot="body_alt">Microsoft Teams</div>
          <div class="blue-text" slot="right_element">Dr. Yoru</div>
        </ListItem>

        <ListItem>
          <svelte:fragment slot="left_element"></svelte:fragment>
          <svelte:fragment slot="body_title">Academic Research Skills</svelte:fragment>
          <div class="green-text" slot="body_content">11:30 - 1:30PM</div>
          <div class="red-text" slot="body_alt">Microsoft Teams</div>
          <div class="blue-text" slot="right_element">Dr. Raze</div>
        </ListItem>

        <ListItem>
          <svelte:fragment slot="left_element"></svelte:fragment>
          <svelte:fragment slot="body_title">Information Systems</svelte:fragment>
          <div class="green-text" slot="body_content">2:00PM - 3:00PM</div>
          <div class="red-text" slot="body_alt">Microsoft Teams</div>
          <div class="blue-text" slot="right_element">Dr. Sage</div>
        </ListItem>

        <ListItem>
          <svelte:fragment slot="left_element"></svelte:fragment>
          <svelte:fragment slot="body_title">System Analysis & Design</svelte:fragment>
          <div class="green-text" slot="body_content">3:15PM - 5:15PM</div>
          <div class="red-text" slot="body_alt">Microsoft Teams</div>
          <div class="blue-text" slot="right_element">Dr. Kayo</div>
        </ListItem>

        <ListItem>
          <svelte:fragment slot="left_element"></svelte:fragment>
          <svelte:fragment slot="body_title">Phython</svelte:fragment>
          <div class="green-text" slot="body_content">5:30PM - 6:30PM</div>
          <div class="red-text" slot="body_alt">Microsoft Teams</div>
          <div class="blue-text" slot="right_element">Dr. Jett</div>
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
