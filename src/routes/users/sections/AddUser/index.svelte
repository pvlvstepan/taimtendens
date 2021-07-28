<script>
  import {
    Avatar,
    Button,
    Dialog,
    Icon,
    Select,
    Snackbar,
    TextField,
  } from 'svelte-materialify/src';
  import Card from '../../../../components/Card/Card.svelte';
  import Tabs from '../../../../components/Tabs/Tabs.svelte';

  export let active, intakes, modules;
  let show;

  const inputs = {
    first_name: {
      isValid: false,
      value: '',
    },
    last_name: {
      isValid: false,
      value: '',
    },
    email: {
      isValid: false,
      value: '',
    },
    password: {
      isValid: false,
      value: '',
    },
    profile_pic: '',
    role_id: {
      isValid: false,
      value: '',
    },
    intake_id: {
      value: '',
      isValid: false,
    },
    module_id: {
      value: '',
      isValid: false,
    },
  };

  const firstNameRules = [
    v => {
      inputs.first_name.value = v;
      if (!v) {
        inputs.first_name.isValid = false;
        return 'Please enter first name';
      }
      inputs.first_name.isValid = true;
      return false;
    },
    v => {
      inputs.first_name.value = v;
      const pattern = /^[A-Za-z]+$/;
      if (!pattern.test(v)) {
        inputs.first_name.isValid = false;
        return 'Incorrect first name';
      }
      inputs.first_name.isValid = true;
      return false;
    },
  ];

  const lastNameRules = [
    v => {
      inputs.last_name.value = v;
      if (!v) {
        inputs.last_name.isValid = false;
        return 'Please enter first name';
      }
      inputs.last_name.isValid = true;
      return false;
    },
    v => {
      inputs.last_name.value = v;
      const pattern = /^[A-Za-z]+$/;
      if (!pattern.test(v)) {
        inputs.last_name.isValid = false;
        return 'Incorrect last name';
      }
      inputs.last_name.isValid = true;
      return false;
    },
  ];

  const emailRules = [
    v => {
      inputs.email.value = v;
      if (!v) {
        inputs.email.isValid = false;
        return 'Please enter email';
      }
      inputs.email.isValid = true;
      return false;
    },
    v => {
      inputs.email.value = v;
      const pattern =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!pattern.test(v)) {
        inputs.email.isValid = false;
        return 'Incorrect email';
      }
      inputs.email.isValid = true;
      return false;
    },
  ];

  const passwordRules = [
    v => {
      inputs.password.value = v;
      if (!v) {
        inputs.password.isValid = false;
        return 'Please enter password';
      }
      inputs.password.isValid = true;
      return false;
    },
    v => {
      inputs.password.value = v;
      if (v.length < 8) {
        inputs.password.isValid = false;
        return 'Password should be at least 8 charachters long';
      }
      inputs.password.isValid = true;
      return false;
    },
  ];

  const getBase64 = e => {
    const file = e.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      inputs.profile_pic = reader.result;
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  };

  const tabs = [
    {
      id: 0,
      label: 'Student',
    },
    {
      id: 1,
      label: 'Lecturer',
    },
    {
      id: 2,
      label: 'Admin',
    },
  ];

  let currentTab;

  let roleSelectionValid = false;

  const onSelectChange = () => {
    if (currentTab === 0 && inputs.intake_id.value !== '') {
      roleSelectionValid = true;
    } else if (currentTab === 1 && inputs.module_id.value !== '') {
      roleSelectionValid = true;
    } else if (currentTab === 2) {
      roleSelectionValid = true;
    } else {
      roleSelectionValid = false;
    }
  };

  const changeTab = e => {
    if (currentTab === 0) {
      inputs.intake_id.value = '';
    } else if (currentTab === 1) {
      inputs.module_id.value = '';
    }
    currentTab = e.detail.id;
    inputs.role_id.isValid = true;
    inputs.role_id.value = currentTab;
    if (currentTab === 2) {
      inputs.module_id.value = '';
      inputs.intake_id.value = '';
      roleSelectionValid = true;
    } else {
      roleSelectionValid = false;
    }
  };

  let snackbar = false;
  let error = false;

  const addUser = async () => {
    const result = await fetch('users/addUser.json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        first_name: inputs.first_name.value,
        last_name: inputs.last_name.value,
        role_id: inputs.role_id.value,
        email: inputs.email.value,
        password: inputs.password.value,
        profile_pic: inputs.profile_pic,
        intake_id: inputs.intake_id.value,
        module_id: inputs.module_id.value,
      }),
    });

    const response = await result.json();

    if (response.error !== undefined) {
      error = true;
      snackbar = true;
      setTimeout(() => (active = false), 2000);
    } else {
      snackbar = true;
      setTimeout(() => location.replace('/users'), 2000);
    }
  };
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
      <svelte:fragment slot="card_title">Add new user</svelte:fragment>
      <div slot="card_body">
        <form>
          <div class="avatar_wrapper justify-center d-flex mb-4">
            <Avatar
              size="120px"
              class="primary-color text-center text-h2 elevation-4"
            >
              {#if inputs.profile_pic !== ''}
                <img
                  src={inputs.profile_pic}
                  alt="Avatar"
                  style="object-fit: cover; width: 115px; height: 115px"
                />
              {:else}
                {`${inputs.first_name.value.charAt(
                  0
                )}${inputs.last_name.value.charAt(0)}`}
              {/if}
            </Avatar>
          </div>
          <div class="justify-center mb-4 row_items">
            <input
              type="file"
              id="my_file"
              accept="image/png, image/jpeg"
              on:change={e => getBase64(e)}
            />
            <Button
              depressed
              on:click={() => document.getElementById('my_file').click()}
              style={`display: ${inputs.profile_pic !== '' ? 'none' : 'flex'}`}
              >Choose Avatar</Button
            >
            <Button
              on:click={() => {
                document.getElementById('my_file').value = '';
                inputs.profile_pic = '';
              }}
              depressed
              class="red white-text"
              style={`display: ${inputs.profile_pic !== '' ? 'flex' : 'none'}`}
            >
              <Icon class="mdi mdi-delete" />
            </Button>
          </div>
          <TextField class="mb-4" dense outlined rules={firstNameRules}
            >First Name</TextField
          >
          <TextField class="mb-4" dense outlined rules={lastNameRules}
            >Last Name</TextField
          >
          <TextField class="mb-4" dense outlined rules={emailRules}
            >Email</TextField
          >
          <div class="row_items mb-4">
            <TextField
              outlined
              dense
              value={inputs.password.value}
              type={show ? 'text' : 'password'}
              rules={passwordRules}
            >
              <span slot="append">
                <Button text icon on:click={() => (show = !show)}>
                  <Icon class={`mdi ${!show ? 'mdi-eye' : 'mdi-eye-off'}`} />
                </Button>
              </span>
              Password
            </TextField>
            <Button
              depressed
              on:click={() => {
                inputs.password.value =
                  Math.random().toString(36).slice(2) +
                  Math.random().toString(36).slice(2);
                inputs.password.isValid = true;
              }}>Generate</Button
            >
          </div>
          <h6 class="text-overline mb-1">User Role</h6>
          <div class="mb-4">
            <Tabs {tabs} {currentTab} on:change={changeTab} full />
          </div>
          {#if currentTab === 0}
            <Select
              on:change={() => onSelectChange()}
              mandatory
              outlined
              dense
              items={intakes}
              bind:value={inputs.intake_id.value}>Intake</Select
            >
          {:else if currentTab === 1}
            <Select
              on:change={() => onSelectChange()}
              mandatory
              outlined
              dense
              items={modules}
              bind:value={inputs.module_id.value}>Module</Select
            >
          {/if}
        </form>
      </div>
      <div slot="card_footer" class="button_wrapper">
        <Button on:click={() => (active = false)} text>Cancel</Button>
        <Button
          disabled={!inputs.first_name.isValid ||
            !inputs.last_name.isValid ||
            !inputs.email.isValid ||
            !inputs.password.isValid ||
            !roleSelectionValid ||
            !inputs.role_id.isValid}
          class={!inputs.first_name.isValid ||
            !inputs.last_name.isValid ||
            !inputs.email.isValid ||
            !inputs.password.isValid ||
            !inputs.role_id.isValid ||
            !roleSelectionValid ||
            'primary-color'}
          on:click={() => addUser()}>Add User</Button
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
  {error === false ? 'User Added Successfuly' : 'Something went wrong...'}
</Snackbar>

<style>
  #my_file {
    display: none;
  }
  .avatar_wrapper {
    align-items: center;
    flex: auto;
    margin: 0 auto;
  }
  .row_items {
    display: flex;
    align-items: center;
    flex-direction: row;
    column-gap: 8px;
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
</style>
