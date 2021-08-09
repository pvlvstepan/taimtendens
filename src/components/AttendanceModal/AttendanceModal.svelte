<script>
  import { Button, Dialog, Icon, Snackbar } from 'svelte-materialify/src';
  import { signAttendanceIsOpen } from '../../stores.js';
  import Card from '../../components/Card/Card.svelte';

  export let user_tp;

  let active,
    isValid = false,
    values = [];

  signAttendanceIsOpen.subscribe(value => {
    active = value;
    if (active === false) values = [];
    isValid = false;
  });

  let OTP = '';

  const handleKeyPress = e => {
    OTP = '';

    const id = parseInt(e.target.id);
    const prev = id - 1;
    const next = id + 1;

    if (e.keyCode === 8 || (e.keyCode >= 48 && e.keyCode <= 57)) {
      if (e.keyCode === 8 && values[id] && values[id] !== null) {
        values[id] = null;
      } else if (e.keyCode === 8 && id > 0 && values[id] === null) {
        document.getElementById(prev).focus();
      } else {
        if (!values[id] || values[id] === null) values[id] = parseInt(e.key);
        if (id < 2) {
          document.getElementById(next).focus();
        }
      }
    }

    if (e.keyCode === 37 && id > 0) {
      document.getElementById(prev).focus();
    } else if (e.keyCode === 39 && id < 2) {
      document.getElementById(next).focus();
    }

    isValid = !values.includes(null) && values.length === 3;
    e.preventDefault();

    values.map(val => {
      OTP += val;
    });
  };

  let snackbar = false;
  let message = '';

  const markAttendance = async (user_tp, timeslot_id) => {
    if (isMounted) {
      const results = await fetch(`attendance/markAttendance.json`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          timeslot_id: timeslot_id,
          user_tp: user_tp,
          present: true
        })
      });

      const response = await results.json();

      if (response.error !== undefined) {
        snackbar = true;
        message = 'Something went wrong...';
        setTimeout(() => (active = false), 3000);
      } else {
        snackbar = true;
        message = 'Attendance Signed Successfuly';
        setTimeout(() => (active = false), 3000);
      }
    }
  };

  const signAttendance = async () => {
    const result = await fetch('attendance/findClass.json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        OTP: OTP,
        user_tp: user_tp
      })
    });

    const res = await result.json();

    if (res.error !== undefined) {
      snackbar = true;
      message = 'Something went wrong...';
      setTimeout(() => (active = false), 3000);
    } else if (res.length !== 1) {
      snackbar = true;
      message = 'Classroom not found';
      setTimeout(() => (active = false), 3000);
    } else {
      markAttendance(user_tp, res[0].timeslot_id);
    }
  };
</script>

<Dialog persistent bind:active>
  <div class="dialog_content">
    <Button
      class="btn_close"
      on:click={() => signAttendanceIsOpen.set(false)}
      icon
      style="position: absolute; top: 8px; right: 8px;"
      ><Icon class="mdi mdi-close" /></Button
    >
    <Card>
      <svelte:fragment slot="card_title">Sign Attendance</svelte:fragment>
      <div class="card_body" slot="card_body">
        <div class="inputs_wrapper">
          <div class="input_wrapper">
            <input
              class="text-h4 text-center primary-text"
              id="0"
              value={values[0] ? values[0] : null}
              maxlength="1"
              min="1"
              step="1"
              on:keydown={handleKeyPress}
            />
          </div>
          <div class="input_wrapper">
            <input
              class="text-h4 text-center primary-text"
              id="1"
              value={values[1] ? values[1] : null}
              maxlength="1"
              min="1"
              step="1"
              on:keydown={handleKeyPress}
            />
          </div>
          <div class="input_wrapper">
            <input
              class="text-h4 text-center primary-text"
              id="2"
              value={values[2] ? values[2] : null}
              maxlength="1"
              min="1"
              step="1"
              on:keydown={handleKeyPress}
            />
          </div>
        </div>
        <h6 class="text-body-1">
          Enter 3-digit code from the lecturer's screen
        </h6>
      </div>
      <div slot="card_footer" class="button_wrapper">
        <Button on:click={() => signAttendanceIsOpen.set(false)} text>
          Cancel
        </Button>
        {#if isValid}
          <Button on:click={() => signAttendance()} class="primary-color">
            Sign Attendance
          </Button>
        {:else}
          <Button disabled>Sign Attendance</Button>
        {/if}
      </div>
    </Card>
  </div>
</Dialog>

<Snackbar
  class="flex-column"
  bind:active={snackbar}
  bottom
  center
  timeout={1000}
>
  {message}
</Snackbar>

<style>
  .card_body {
    padding: 30px 0;
    display: flex;
    align-items: center;
    flex-direction: column;
    row-gap: 15px;
  }
  .dialog_content {
    position: relative;
  }
  .button_wrapper {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    column-gap: 8px;
  }
  .inputs_wrapper {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    column-gap: 15px;
  }
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  .input_wrapper {
    max-width: 56px;
    max-height: 56px;
  }
  .input_wrapper input {
    max-width: 100%;
    width: 56px;
    height: 56px;
    border-radius: 8px;
    border: 1px solid var(--theme-text-fields-outlined);
    transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
  }
  .input_wrapper input:hover {
    border: 1px solid var(--theme-text-primary);
  }
  .input_wrapper input:active {
    transition: none;
    outline: none;
    border: 2px solid #6200ee;
  }
  .input_wrapper input:focus {
    outline: none;
    border: 2px solid #6200ee;
  }
</style>
