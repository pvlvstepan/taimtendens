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
  <Tabs {tabs} {currentTab} on:change={changeTab} />
  <Button on:click={toggleTheme} icon style="margin-right: 16px">
    <Icon path={mdiThemeLightDark} />
  </Button>
</AppBar>
