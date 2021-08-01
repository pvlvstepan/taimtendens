<script>
  import {
    Button,
    Dialog,
    Icon,
    Snackbar,
    TextField
  } from 'svelte-materialify/src';
  import Card from '../../../../components/Card/Card.svelte';

  export let user;

  let loginIsValid = true;
  let active;
  let show;
  let snackbar = false;

  const inputs = {
    email: {
      isValid: false,
      value: ''
    },
    password: {
      isValid: false,
      value: ''
    }
  };

  const emailRules = [
    v => {
      loginIsValid = true;
      inputs.email.value = v;
      if (!v) {
        inputs.email.isValid = false;
        return 'Please enter your email';
      }
      inputs.email.isValid = true;
      return false;
    },
    v => {
      loginIsValid = true;
      inputs.email.value = v;
      const pattern =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!pattern.test(v)) {
        inputs.email.isValid = false;
        return 'Incorrect email';
      }
      inputs.email.isValid = true;
      return false;
    }
  ];

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
    }
  ];

  const changeEmail = async () => {
    const result = await fetch('settings/email.json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        tpNumber: user.user_tp,
        password: inputs.password.value,
        email: inputs.email.value
      })
    });

    const email = await result.json();

    if (email.error !== undefined) {
      loginIsValid = false;
    } else {
      active = false;
      snackbar = true;
      setTimeout(() => location.replace('/settings'), 1000);
    }
  };

  const verifyLogin = async () => {
    const result = await fetch('settings/verify.json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        tpNumber: user.user_tp,
        password: inputs.password.value
      })
    });

    const verify = await result.json();

    if (verify.error !== undefined) {
      loginIsValid = false;
    } else {
      changeEmail();
    }
  };
</script>

<Card>
  <svelte:fragment slot="card_title">Change Email</svelte:fragment>
  <svelte:fragment slot="card_body">
    <TextField outlined dense rules={emailRules} value={user.email}>
      Email
    </TextField>
    {#if inputs.email.value !== '' && inputs.email.value !== user.email}
      <div class="button_wrapper">
        <Button
          disabled={!inputs.email.isValid}
          class={!inputs.email.isValid || 'primary-color'}
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
        <h6 class="text-body-1">
          Your email will be changed to <b>{inputs.email.value}</b>
        </h6>
        <h6 class="text-body-1">Please verify it's you before we proceed.</h6>
        <TextField
          outlined
          dense
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
  timeout={1000}
>
  Email changed successfuly
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
