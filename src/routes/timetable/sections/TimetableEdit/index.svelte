<script>
  import {
    Button,
    Dialog,
    Icon,
    Select,
    Snackbar,
    TextField
  } from 'svelte-materialify/src';
  import Datepicker from 'svelte-calendar';
  import Card from '../../../../components/Card/Card.svelte';
  import { getMonday } from '../../../../utils/getFirstDay';
  import dayjs from 'dayjs';
  import tConvert from '../../../../utils/convertTime';

  export let intakes, active, currentIntake, modules, editingClass;

  console.log(editingClass);

  let snackbar = false;
  let error = false;

  let selectedModule = editingClass.module_id;

  const editTimetable = async () => {
    const result = await fetch('timetable/editTimetable.json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        module_id: selectedModule,
        time_start: time_start,
        time_end: time_end,
        date: convertToSqlFormat(formattedSelected),
        location: inputs.location.value,
        timeslot_id: editingClass.timeslot_id
      })
    });

    const response = await result.json();

    if (response.error !== undefined) {
      error = true;
      snackbar = true;
      setTimeout(() => (active = false), 2000);
    } else {
      snackbar = true;
      setTimeout(() => location.replace('/timetable'), 2000);
    }
  };

  Date.prototype.addDays = function (days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
  };

  let formattedSelected,
    dateChosen = true;

  let minDate = getMonday(new Date());
  let maxDate = minDate.addDays(13);

  let time_start = tConvert(
    editingClass.time_start.slice(0, editingClass.time_start.length - 3)
  );
  let time_end = tConvert(
    editingClass.time_end.slice(0, editingClass.time_end.length - 3)
  );

  const convertToSqlFormat = date => {
    const [dd, mm, yyyy] = date.split('/');

    return `${yyyy}/${mm}/${dd}`;
  };

  const convertTime12to24 = time12h => {
    const [time, modifier] = time12h.split(' ');

    let [hours, minutes] = time.split(':');

    if (hours === '12') {
      hours = '00';
    }

    if (modifier === 'PM') {
      hours = parseInt(hours, 10) + 12;
    }

    return `${hours}:${minutes}:00`;
  };

  const inputs = {
    location: {
      value: editingClass.location,
      isValid: true
    }
  };

  const locationRules = [
    v => {
      inputs.location.value = v;
      if (!v) {
        inputs.location.isValid = false;
        return 'Please enter location';
      }
      inputs.location.isValid = true;
      return false;
    },
    v => {
      inputs.location.value = v;
      const pattern = /^\w+( \w+)*$/;
      if (!pattern.test(v)) {
        inputs.location.isValid = false;
        return 'Incorrect location format';
      }
      inputs.location.isValid = true;
      return false;
    }
  ];

  var times = [],
    periods = ['AM', 'PM'],
    hours = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
    prop = null,
    hour = null,
    min = null;

  for (prop in periods) {
    for (hour in hours) {
      for (min = 0; min < 60; min += 15) {
        times.push({
          name:
            ('0' + hours[hour]).slice(-2) +
            ':' +
            ('0' + min).slice(-2) +
            ' ' +
            periods[prop],
          value: convertTime12to24(
            ('0' + hours[hour]).slice(-2) +
              ':' +
              ('0' + min).slice(-2) +
              ' ' +
              periods[prop]
          )
        });
      }
    }
  }
</script>

<Dialog persistent bind:active>
  <div class="dialog_content">
    <Button
      class="btn_close"
      on:click={() => (active = false)}
      icon
      style="position: absolute; top: 8px; right: 8px;"
      ><Icon class="mdi mdi-close" /></Button
    >
    <Card>
      <svelte:fragment slot="card_title">Edit Timetable Class</svelte:fragment>
      <form slot="card_body">
        <Select
          class="mb-4"
          dense
          outlined
          mandatory
          disabled
          items={intakes}
          bind:value={currentIntake}>Intake</Select
        >
        <Select
          class="mb-4"
          dense
          outlined
          mandatory
          items={modules}
          bind:value={selectedModule}>Module</Select
        >
        <div class="d-flex justify-center mb-4">
          <Datepicker
            highlightColor="#6200ee"
            format={date => dayjs(date).format('DD/MM/YYYY')}
            start={minDate}
            end={maxDate}
            bind:formattedSelected
            bind:dateChosen
            selected={new Date(editingClass.date)}
            style="border-radius: 15px"
          >
            <Button class="primary-color">
              {#if dateChosen}
                Date: {formattedSelected}
              {:else}
                Pick a date
              {/if}
            </Button>
          </Datepicker>
        </div>
        <Select
          class="mb-4"
          dense
          outlined
          mandatory
          items={times}
          bind:value={time_start}>Start Time</Select
        >
        <Select
          dense
          outlined
          mandatory
          class="mb-4"
          items={times}
          bind:value={time_end}>End Time</Select
        >
        <TextField
          rules={locationRules}
          dense
          outlined
          bind:value={inputs.location.value}>Location</TextField
        >
      </form>
      <div slot="card_footer" class="button_wrapper">
        <Button on:click={() => (active = false)} text>Cancel</Button>
        <Button
          disabled={!dateChosen ||
            !time_start.length > 0 ||
            !time_end.length > 0 ||
            !selectedModule.length > 0 ||
            !currentIntake.length > 0 ||
            !inputs.location.isValid}
          class={!dateChosen ||
          !time_start.length > 0 ||
          !time_end.length > 0 ||
          !selectedModule.length > 0 ||
          !currentIntake.length > 0 ||
          !inputs.location.isValid
            ? ''
            : 'primary-color'}
          on:click={() => editTimetable()}>Save changes</Button
        >
      </div>
    </Card>
  </div>
</Dialog>

<Snackbar
  class="flex-column"
  bind:active={snackbar}
  bottom
  center
  timeout={2000}
>
  {error === false ? 'Changes Saved Successfuly' : 'Something went wrong...'}
</Snackbar>

<style>
  .dialog_content {
    position: relative;
  }
  .button_wrapper {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    column-gap: 8px;
  }
</style>
