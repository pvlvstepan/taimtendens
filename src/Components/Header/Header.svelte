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
  let currentTab;
  tabValue.subscribe((value) => {
    currentTab = value;
  });
  const changeTab = (val) => {
    tabValue.set(val);
  };
</script>

<AppBar style="position: relative">
  <span slot="title"><h5>TaimTendens</h5></span>
  <span style="flex: 1" />
  <div class="button_wrapper">
    <Button
      text
      active={currentTab === 0 ? true : false}
      size="large"
      class={currentTab === 0 ? 'primary-text' : ''}
      on:click={() => changeTab(0)}
    >
      <div class="button_elements">
        <Icon path={mdiViewDashboard} />
        <span>Dashboard</span>
      </div>
    </Button>
    <Button
      text
      active={currentTab === 1 ? true : false}
      size="large"
      class={currentTab === 1 ? 'primary-text' : ''}
      on:click={() => changeTab(1)}
    >
      <div class="button_elements">
        <Icon path={mdiClockCheck} />
        <span>Attendance</span>
      </div>
    </Button>
    <Button
      text
      active={currentTab === 2 ? true : false}
      size="large"
      class={currentTab === 2 ? 'primary-text' : ''}
      on:click={() => changeTab(2)}
    >
      <div class="button_elements">
        <Icon path={mdiTimetable} />
        <span>Timetable</span>
      </div>
    </Button>
  </div>
  <Button on:click={toggleTheme} icon style="margin-right: 16px">
    <Icon path={mdiThemeLightDark} />
  </Button>
</AppBar>

<style lang="scss">
  .button_wrapper {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    flex-direction: row;
    column-gap: 10px;
    align-items: center;
    justify-content: center;
    flex: 1;
    height: 100%;
  }
  .button_elements {
    padding: 3px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>
