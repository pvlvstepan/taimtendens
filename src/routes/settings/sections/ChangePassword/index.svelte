<script>
  import {
    Button,
    Dialog,
    Icon,
    Snackbar,
    TextField,
  } from 'svelte-materialify/src';
  import Card from '../../../../components/Card/Card.svelte';

  export let user;

  let loginIsValid = true;
  let active;
  let show = false;
  let show2 = false;
  let snackbar = false;

  const inputs = {
    newPass: {
      isValid: false,
      value: '',
    },
    repeatPass: {
      isValid: false,
      value: '',
    },
    password: {
      isValid: false,
      value: '',
    },
  };

  const passwordRules = [
    v => {
      loginIsValid = true;
      inputs.password.value = v;
      if (!v) {
        inputs.password.isValid = false;
        return 'Please enter your password';
      }
      inputs.password.isValid = true;
      return false;
    },
    v => {
      loginIsValid = true;
      inputs.password.value = v;
      if (v.length < 8) {
        inputs.password.isValid = false;
        return 'Password should be at least 8 charachters long';
      }
      inputs.password.isValid = true;
      return false;
    },
  ];

  const newPassRules = [
    v => {
      loginIsValid = true;
      inputs.newPass.value = v;
      if (!v) {
        inputs.newPass.isValid = false;
        return 'Please enter new password';
      }
      inputs.newPass.isValid = true;
      return false;
    },
    v => {
      loginIsValid = true;
      inputs.newPass.value = v;
      if (v.length < 8) {
        inputs.newPass.isValid = false;
        return 'Password should be at least 8 charachters long';
      }
      inputs.newPass.isValid = true;
      return false;
    },
  ];

  const repNewPassRules = [
    v => {
      loginIsValid = true;
      inputs.repeatPass.value = v;
      if (v !== inputs.newPass.value) {
        inputs.repeatPass.isValid = false;
        return 'Passwords do not match';
      }
      inputs.repeatPass.isValid = true;
      return false;
    },
  ];

  const changePassword = async () => {
    const result = await fetch('settings/password.json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        tpNumber: user.user_tp,
        password: inputs.password.value,
        newPass: inputs.newPass.value,
      }),
    });

    const password = await result.json();

    if (password.error !== undefined) {
      loginIsValid = false;
    } else {
      active = false;
      snackbar = true;
      setTimeout(() => location.replace('/settings'), 2000);
    }
  };

  const verifyLogin = async () => {
    const result = await fetch('settings/verify.json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        tpNumber: user.user_tp,
        password: inputs.password.value,
      }),
    });

    const verify = await result.json();

    if (verify.error !== undefined) {
      loginIsValid = false;
    } else {
      changePassword();
    }
  };
</script>

<Card>
  <svelte:fragment slot="card_title">Change Password</svelte:fragment>
  <svelte:fragment slot="card_body">
    <TextField
      outlined
      dense
      rules={newPassRules}
      type={show ? 'text' : 'password'}
    >
      <span slot="append">
        <Button text icon on:click={() => (show = !show)}>
          <Icon class={`mdi ${!show ? 'mdi-eye' : 'mdi-eye-off'}`} />
        </Button>
      </span>
      New Password
    </TextField>
    <TextField outlined dense rules={repNewPassRules} type="password">
      Repeat Password
    </TextField>
    {#if inputs.newPass.value !== '' && inputs.repeatPass.value !== ''}
      <div class="button_wrapper">
        <Button
          disabled={!inputs.newPass.isValid || !inputs.repeatPass.isValid}
          class={!inputs.newPass.isValid ||
            !inputs.repeatPass.isValid ||
            'primary-color'}
          on:click={() => (active = true)}>Save</Button
        >
      </div>
    {/if}
  </svelte:fragment>
</Card>

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
      <svelte:fragment slot="card_title">Verification</svelte:fragment>
      <div class="card_body" slot="card_body">
        <h6 class="text-body-1">Your password will be changed</h6>
        <h6 class="text-body-1">Please verify it's you before we proceed.</h6>
        <TextField
          outlined
          dense
          type={show2 ? 'text' : 'password'}
          rules={passwordRules}
        >
          <span slot="append">
            <Button text icon on:click={() => (show2 = !show2)}>
              <Icon class={`mdi ${!show2 ? 'mdi-eye' : 'mdi-eye-off'}`} />
            </Button>
          </span>
          Password
        </TextField>
        <div class="text-left red-text" hidden={loginIsValid}>
          Incorrect password
        </div>
      </div>
      <div slot="card_footer" class="d_button_wrapper">
        <Button on:click={() => (active = false)} text>Cancel</Button>
        <Button
          on:click={() => verifyLogin()}
          type="submit"
          disabled={!inputs.password.isValid}
          class={!inputs.password.isValid || 'primary-color'}>Verify</Button
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
  Password changed successfuly
</Snackbar>

<style>
  .card_body {
    padding-top: 15px;
    display: flex;
    flex-direction: column;
    row-gap: 15px;
  }
  .dialog_content {
    position: relative;
  }
  .d_button_wrapper {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    column-gap: 8px;
  }
  .button_wrapper {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
</style>
