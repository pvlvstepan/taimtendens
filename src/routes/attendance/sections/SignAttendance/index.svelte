<script>
  import { afterUpdate, onMount } from 'svelte';

  import {
    Button,
    Dialog,
    Icon,
    Select,
    Window,
    WindowItem
  } from 'svelte-materialify/src';
  import Card from '../../../../components/Card/Card.svelte';
  import ListItem from '../../../../components/ListItem/ListItem.svelte';
  import Tabs from '../../../../components/Tabs/Tabs.svelte';
  import tConvert from '../../../../utils/convertTime';
  import { getMonday } from '../../../../utils/getFirstDay';

  export let active;
  export let withNumber;
  export let timetable;
  export let intakes, currentIntake, user;
  export let selectedTimeslot;
  export let SelectStudentsIsOpen;

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

      var inputDate = new Date(v.date);
      var todaysDate = new Date();
      if (inputDate.setHours(0, 0, 0, 0) == todaysDate.setHours(0, 0, 0, 0)) {
        v.canBeSigned = true;
      } else {
        v.canBeSigned = false;
      }

      if (Date.parse(v.date) - Date.parse(new Date()) < 0) {
        v.canBeReSigned = true;
      } else {
        v.canBeReSigned = false;
      }

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

<Dialog persistent bind:active width={660}>
  <div class="dialog_content">
    <Button
      class="btn_close"
      on:click={() => (active = false)}
      icon
      style="position: absolute; top: 8px; right: 8px;"
      ><Icon class="mdi mdi-close" /></Button
    >
    <Card>
      <svelte:fragment slot="card_title">Select Module</svelte:fragment>
      <svelte:fragment slot="card_body">
        <h6 style="flex: 1">
          Week {getMonday(new Date()).toDateString().slice(4)}
        </h6>
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
                        >{day_class.module_name} -
                        <span class="primary-text"
                          >{day_class.module_id || day_class.intake_id}</span
                        ></svelte:fragment
                      >
                      <div class="green-text row_items" slot="body_content">
                        <Icon class="mdi mdi-clock-outline" size="16px" />
                        {tConvert(
                          day_class.time_start.slice(
                            0,
                            day_class.time_start.length - 3
                          )
                        )} - {tConvert(
                          day_class.time_end.slice(
                            0,
                            day_class.time_end.length - 3
                          )
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
                        {#if day_class.canBeSigned}
                          <Button
                            text
                            icon
                            class="edit_button"
                            on:click={() => {
                              selectedTimeslot = day_class;
                              SelectStudentsIsOpen = true;
                              withNumber = true;
                            }}
                          >
                            <Icon class="mdi mdi-numeric" />
                          </Button>
                        {:else if !day_class.canBeSigned}
                          <Button text icon class="edit_button" disabled>
                            <Icon class="mdi mdi-numeric" />
                          </Button>
                        {/if}
                        {#if day_class.canBeReSigned}
                          <Button
                            text
                            icon
                            class="edit_button"
                            on:click={() => {
                              selectedTimeslot = day_class;
                              SelectStudentsIsOpen = true;
                              withNumber = false;
                            }}
                          >
                            <Icon class="mdi mdi-pen-plus" />
                          </Button>
                        {:else}
                          <Button text icon class="edit_button" disabled>
                            <Icon class="mdi mdi-pen-plus" />
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
      </svelte:fragment>
    </Card>
  </div>
</Dialog>

<style>
  .no-classes {
    height: 150px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .dialog_content {
    position: relative;
  }
  .col_items {
    display: flex;
    flex-direction: column;
    row-gap: 8px;
  }
</style>
