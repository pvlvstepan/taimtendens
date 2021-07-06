<script>
  export let toggleTheme;

  import { AppBar, Button, Icon } from 'svelte-materialify';
  import {
    mdiViewDashboard,
    mdiTimetable,
    mdiClockCheck,
    mdiThemeLightDark,
  } from '@mdi/js';

  import { tabValue } from '../../store/store';
  import Tabs from '../Tabs/Tabs.svelte';

  let currentTab;
  tabValue.subscribe((value) => {
    currentTab = value;
  });

  const changeTab = (e) => {
    tabValue.set(e.detail.id);
  };

  const tabs = [
    {
      id: 0,
      label: 'Dashboard',
      icon: mdiViewDashboard,
    },
    {
      id: 1,
      label: 'Attendance',
      icon: mdiClockCheck,
    },
    {
      id: 2,
      label: 'Timetable',
      icon: mdiTimetable,
    },
  ];
</script>

<AppBar style="position: relative">
  <span slot="title"><h5>TaimTendens</h5></span>
  <span style="flex: 1" />
  <div class="tabs_wrapper">
    <Tabs {tabs} {currentTab} on:change={changeTab} />
  </div>
  <Button on:click={toggleTheme} icon style="margin-right: 16px">
    <Icon path={mdiThemeLightDark} />
  </Button>
</AppBar>

<style lang="scss">
  .tabs_wrapper {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
</style>
