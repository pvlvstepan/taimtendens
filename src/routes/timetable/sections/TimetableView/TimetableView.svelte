<script>
  import Card from '../../../../Components/Card/Card.svelte';
  import Tabs from '../../../../Components/Tabs/Tabs.svelte';
  import ListItem from '../../../../Components/ListItem/ListItem.svelte';
  import {
    Window,
    WindowItem,
    Icon,
    Menu,
    Button,
    List,
    ListItem as MListItem,
    Select
  } from 'svelte-materialify/src';
  import tConvert from '../../../../utils/convertTime';
  import { afterUpdate, onMount } from 'svelte';
  import { getMonday } from '../../../../utils/getFirstDay';

  const tabs = [
    { id: 0, label: 'Monday' },
    { id: 1, label: 'Tuesday' },
    { id: 2, label: 'Wednesday' },
    { id: 3, label: 'Thursday' },
    { id: 4, label: 'Friday' }
  ];

  let currentTab = 0;

  const changeTab = e => {
    currentTab = e.detail.id;
  };

  export let timetable;
  export let nextWeek;
  export let user, intakes, currentIntake;
  export let timetableAddIsOpen;
  export let editingClass, classEditIsOpen;

  currentIntake = intakes[0].value;

  function getDayOfWeek(date) {
    const dayOfWeek = new Date(date).getDay();
    return isNaN(dayOfWeek)
      ? null
      : [
          'Sunday',
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday'
        ][dayOfWeek];
  }

  let weekdays = {};

  const sortData = () => {
    weekdays = timetable.reduce((c, v) => {
      c[getDayOfWeek(v.date)] = c[getDayOfWeek(v.date)] || []; //Initiate if key does not exist
      c[getDayOfWeek(v.date)].push(v); //Push the value
      return c;
    }, {});
  };

  onMount(() => {
    if (timetable.length > 0) {
      sortData();
    }
  });

  afterUpdate(() => {
    sortData();
  });
</script>

<Card>
  <svelte:fragment slot="card_title">Timetable</svelte:fragment>
  <svelte:fragment slot="card_body">
    <div class="d-flex">
      <h6 style="flex: 1">
        Week {!nextWeek
          ? getMonday(new Date()).toDateString().slice(4)
          : getMonday(new Date().setDate(new Date().getDate() + 7))
              .toDateString()
              .slice(4)}
      </h6>
      <Menu hover>
        <div slot="activator">
          <Button class="primary-color"
            >{nextWeek === false ? 'This week' : 'Next week'}</Button
          >
        </div>
        <List>
          <MListItem on:click={() => (nextWeek = false)}>This week</MListItem>
          <MListItem on:click={() => (nextWeek = true)}>Next week</MListItem>
        </List>
      </Menu>
    </div>
    {#if user.role_id === 2}
      <Select
        dense
        outlined
        mandatory
        items={intakes}
        bind:value={currentIntake}>Intake</Select
      >
    {/if}
    <Tabs {tabs} {currentTab} on:change={changeTab} full />
    <Window value={currentTab}>
      {#each tabs as day}
        <WindowItem>
          {#if weekdays[day.label] !== undefined}
            <div class="col_items">
              {#each weekdays[day.label] as day_class}
                <ListItem>
                  <svelte:fragment slot="left_element" />
                  <svelte:fragment slot="body_title"
                    >{day_class.module_name || day_class.intake_id} ({day_class.module_id})</svelte:fragment
                  >
                  <div class="green-text row_items" slot="body_content">
                    <Icon class="mdi mdi-clock-outline" size="16px" />
                    {tConvert(
                      day_class.time_start.slice(
                        0,
                        day_class.time_start.length - 3
                      )
                    )} - {tConvert(
                      day_class.time_end.slice(0, day_class.time_end.length - 3)
                    )}
                  </div>
                  <div class="row_items" slot="body_alt">
                    <Icon
                      class="mdi mdi-map-marker-radius-outline"
                      size="16px"
                    />
                    {day_class.location}
                  </div>
                  <svelte:fragment slot="right_element">
                    {#if day_class.was_signed === 0}
                      <Button
                        text
                        icon
                        class="edit_button"
                        on:click={() => {
                          editingClass = day_class;
                          classEditIsOpen = true;
                        }}
                      >
                        <Icon class="mdi mdi-calendar-sync" />
                      </Button>
                    {:else}
                      <Button text icon class="edit_button" disabled>
                        <Icon class="mdi mdi-calendar-sync" />
                      </Button>
                    {/if}
                  </svelte:fragment>
                </ListItem>
              {/each}
            </div>
          {:else}
            <div class="no-classes">
              <h6>No classes on {day.label}</h6>
            </div>
          {/if}
        </WindowItem>
      {/each}
    </Window>
    {#if user.role_id === 2}
      <Button class="primary-color" on:click={() => (timetableAddIsOpen = true)}
        >Add class to timetable</Button
      >
    {/if}
  </svelte:fragment>
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
    display: flex;
    flex-direction: column;
    row-gap: 8px;
  }
</style>
