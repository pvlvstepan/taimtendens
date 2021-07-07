<script>
  import ListItem from '../../../../Components/ListItem/ListItem.svelte';
  import Card from '../../../../Components/Card/Card.svelte';
  import { Button, Icon, Window, WindowItem } from 'svelte-materialify';
  import {
    mdiArrowRight,
    mdiEmoticon,
    mdiCalendarToday,
    mdiCalendar,
  } from '@mdi/js';
  import Tabs from '../../../../Components/Tabs/Tabs.svelte';
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

  const changeTab = (e) => {
    currentTab = e.detail.id;
  };
</script>

<Card>
  <svelte:fragment slot="card_title">Upcoming Classes</svelte:fragment>
  <svelte:fragment slot="card_body">
    <Tabs {tabs} {currentTab} on:change={changeTab} full />
    <Window value={currentTab}>
      <WindowItem>
        <ListItem>
          <svelte:fragment slot="left_element">
            <Icon path={mdiEmoticon} />
          </svelte:fragment>
          <svelte:fragment slot="body_title"
            >First List Item Title</svelte:fragment
          >
          <svelte:fragment slot="body_content">Some text here</svelte:fragment>
          <svelte:fragment slot="body_alt">
            There's more space if you need it...
          </svelte:fragment>
          <svelte:fragment slot="right_element">
            <Icon path={mdiEmoticon} />
          </svelte:fragment>
        </ListItem>
      </WindowItem>
      <WindowItem>
        <ListItem>
          <svelte:fragment slot="left_element">
            <Icon path={mdiEmoticon} />
          </svelte:fragment>
          <svelte:fragment slot="body_title">
            Second List Item Title
          </svelte:fragment>
          <svelte:fragment slot="body_content">Some text here</svelte:fragment>
          <svelte:fragment slot="body_alt">
            There's more space if you need it...
          </svelte:fragment>
          <svelte:fragment slot="right_element">
            <Icon path={mdiEmoticon} />
          </svelte:fragment>
        </ListItem>
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

<style lang="scss">
  .button_wrapper {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
</style>
