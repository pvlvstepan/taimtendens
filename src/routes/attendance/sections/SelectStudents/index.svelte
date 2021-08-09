<script>
  import { onMount } from 'svelte';

  import {
    Avatar,
    Button,
    Dialog,
    Icon,
    Snackbar,
    TextField
  } from 'svelte-materialify/src';
  import AttendanceChart from '../../../../components/AttendanceChart/AttendanceChart.svelte';
  import Card from '../../../../components/Card/Card.svelte';
  import ListItem from '../../../../components/ListItem/ListItem.svelte';
  import tConvert from '../../../../utils/convertTime';

  export let active;
  export let selectedTimeslot;
  export let withNumber;

  let isMounted = false;
  let students = [];

  let absent = 0;
  let present = 0;
  let total = 0;
  let OTP = '';

  const loadStudents = async () => {
    if (isMounted) {
      const results = await fetch(`attendance/classAttendance.json`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          intake_id: selectedTimeslot.intake_id,
          timeslot_id: selectedTimeslot.timeslot_id
        })
      });
      students = await results.json();
      sortedUsers = students;
    }
  };

  const generateOTP = () => {
    const digits = '0123456789';
    for (let i = 0; i < 3; i++) {
      OTP += digits[Math.floor(Math.random() * 10)];
    }
  };

  let snackbar = false;
  let error = false;

  const markAttendance = async (user_tp, present) => {
    if (isMounted) {
      const results = await fetch(`attendance/markAttendance.json`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          timeslot_id: selectedTimeslot.timeslot_id,
          user_tp: user_tp,
          present: present
        })
      });

      const response = await results.json();

      if (response.error !== undefined) {
        error = true;
        snackbar = true;
        setTimeout(() => {
          error = false;
          active = false;
        }, 1000);
        loadStudents();
      } else {
        snackbar = true;
        loadStudents();
      }
    }
  };

  const calcAttendance = () => {
    absent = 0;
    present = 0;
    total = 0;
    if (students.length > 0) {
      students.map(val => {
        total += 1;
        if (val.signed !== null) {
          present += 1;
        } else {
          absent += 1;
        }
      });
    }
  };

  const OTPAttendance = async open => {
    if (isMounted && selectedTimeslot) {
      const results = await fetch(`attendance/OTPAttendance.json`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          timeslot_id: selectedTimeslot.timeslot_id,
          OTP: OTP,
          open: open
        })
      });
    }
  };

  $: active, isMounted, OTPAttendance(active);

  onMount(() => {
    isMounted = true;
  });

  $: isMounted, loadStudents();
  $: students, calcAttendance();

  onMount(() => {
    loadStudents();
    generateOTP();
    isMounted = true;
  });

  let sortedUsers;
  let SearchTerm = '';

  const filterUsers = term => {
    SearchTerm = term;
    sortedUsers = students.filter(value => {
      return (
        (value.first_name + ' ' + value.last_name)
          .toLowerCase()
          .includes(SearchTerm.toLowerCase()) ||
        ('TP' + value.user_tp).toLowerCase().includes(SearchTerm.toLowerCase())
      );
    });
  };
</script>

<Dialog persistent bind:active width={withNumber ? 900 : 660}>
  <div class="dialog_content">
    <Button
      class="btn_close"
      on:click={() => {
        active = false;
      }}
      icon
      style="position: absolute; top: 8px; right: 8px;"
      ><Icon class="mdi mdi-close" /></Button
    >
    <div class="row_items">
      <Card>
        <svelte:fragment slot="card_title">Sign Attendance</svelte:fragment>
        <svelte:fragment slot="card_body">
          <h6 class="text-subtitle-1">
            Signing attendance for {selectedTimeslot.intake_id} intake
          </h6>
          <h6 class="text-subtitle-1">
            {selectedTimeslot.module_name} from {tConvert(
              selectedTimeslot.time_start.slice(
                0,
                selectedTimeslot.time_start.length - 3
              )
            )} to {tConvert(
              selectedTimeslot.time_end.slice(
                0,
                selectedTimeslot.time_end.length - 3
              )
            )}
          </h6>
          {#if !withNumber}
            <div class="row_items">
              <span class="red-text">{absent} Absent</span> |
              <span class="green-text">{present} Present</span> |
              <span>{total} Students Total</span>
            </div>
          {/if}
          <div class="row_items">
            <TextField
              outlined
              dense
              on:input={e => filterUsers(e.target.value)}
            >
              <span slot="prepend">
                <Icon class="mdi mdi-account-search" />
              </span>
              Search by TP number or name</TextField
            >
            <Button depressed on:click={() => loadStudents()}>
              <Icon class="mdi mdi-reload" />
            </Button>
          </div>
          <div class="col_items scroll">
            {#if sortedUsers && sortedUsers.length > 0}
              {#each sortedUsers as user}
                <ListItem
                  className={user.signed === null
                    ? 'red lighten-4'
                    : 'green lighten-4'}
                >
                  <svelte:fragment slot="left_element">
                    <Avatar
                      size="40px"
                      class="primary-color text-center text-h5 elevation-4"
                    >
                      {#if user.profile_pic && user.profile_pic !== ''}
                        <img
                          src={user.profile_pic}
                          alt="Avatar"
                          style="object-fit: cover; width: 36px; height: 36px"
                        />
                      {:else}
                        {`${user.first_name.charAt(0)}${user.last_name.charAt(
                          0
                        )}`}
                      {/if}
                    </Avatar>
                  </svelte:fragment>
                  <svelte:fragment slot="body_title"
                    >{user.first_name}
                    {user.last_name}</svelte:fragment
                  >
                  <div class="primary-text row_items" slot="body_content">
                    TP{user.user_tp}
                  </div>
                  <svelte:fragment slot="right_element">
                    <div class="row_items">
                      <Button
                        depressed
                        class={user.signed === null ? '' : 'red white-text'}
                        disabled={user.signed === null}
                        on:click={() => markAttendance(user.user_tp, false)}
                        >Absent</Button
                      >
                      <Button
                        depressed
                        class={user.signed !== null ? '' : 'green white-text'}
                        disabled={user.signed !== null}
                        on:click={() => markAttendance(user.user_tp, true)}
                        >Present</Button
                      >
                    </div>
                  </svelte:fragment>
                </ListItem>
              {/each}
            {:else}
              <div class="no-classes">
                <h6>No students were found</h6>
              </div>
            {/if}
          </div>
        </svelte:fragment>
      </Card>
      {#if withNumber}
        <div class="col_items ma-6" style="width: 50%">
          <AttendanceChart
            attendance={present !== 0
              ? ((present / total) * 100).toFixed(2)
              : 0.0}
            id={3}
          />
          <div class="col_items text-center mb-6">
            <span class="red-text">{absent} Absent</span>
            <span class="green-text">{present} Present</span>
            <span>{total} Students Total</span>
          </div>
          <span class="text-center mb-6"
            >Sign the attendance using the following code</span
          >
          <h1 class="primary-text text-center font-weight-black">{OTP}</h1>
        </div>
      {/if}
    </div>
  </div>
</Dialog>

<Snackbar
  class="flex-column"
  bind:active={snackbar}
  bottom
  center
  timeout={1000}
>
  {error === false ? 'Marked Attendance' : 'Something went wrong...'}
</Snackbar>

<style>
  .dialog_content {
    position: relative;
  }
  .col_items.scroll {
    display: flex;
    flex-direction: column;
    row-gap: 8px;
    height: 500px;
    overflow-y: scroll;
  }
  .col_items {
    display: flex;
    flex-direction: column;
    row-gap: 8px;
  }
  .no-classes {
    height: 150px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .no-classes h6 {
    margin: auto 0;
  }
  .row_items {
    display: flex;
    flex-direction: row;
    column-gap: 8px;
    align-items: center;
  }
</style>
