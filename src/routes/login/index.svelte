<script context="module">
  export async function preload(page, session) {
    if (session.isLoggedIn) {
      return this.redirect(302, 'dashboard');
    }
  }
</script>

<script>
  import {
    Button,
    Card,
    CardText,
    CardTitle,
    Icon,
    TextField,
  } from 'svelte-materialify/src';
  import { goto, stores } from '@sapper/app';
  const { session } = stores();

  const handleLogin = async () => {
    const result = await fetch('login.json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        tpNumber: inputs.tpNumber.value.substring(2),
        password: inputs.password.value,
      }),
    });

    const login = await result.json();

    if (login.error !== undefined) {
      loginIsValid = false;
    } else {
      console.log('[mysql]: Login successful');
      $session.token = login.token;
      $session.isLoggedIn = true;
      goto('login/auth');
    }
  };

  let loginIsValid = true;
  let show = false;

  const inputs = {
    tpNumber: {
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
  const tpRules = [
    v => {
      loginIsValid = true;
      inputs.tpNumber.value = v;
      if (!v) {
        inputs.tpNumber.isValid = false;
        return 'Please enter your TP Number';
      }
      inputs.tpNumber.isValid = true;
      return false;
    },
    v => {
      loginIsValid = true;
      inputs.tpNumber.value = v;
      const pattern = /^[tT][pP]\d{6}$/;
      if (!pattern.test(v)) {
        inputs.tpNumber.isValid = false;
        return 'TP Number should follow the TPXXXXXX pattern';
      }
      inputs.tpNumber.isValid = true;
      return false;
    },
  ];
</script>

<svelte:head>
  <title>TaimTendens | Sign In</title>
</svelte:head>

<div class="d-flex justify-center align-center p-4" style="height:100vh;">
  <Card raised style="max-width:400px; width: 100%; border-radius">
    <CardTitle>Sign In</CardTitle>
    <CardText style="padding-top: 0;">
      <form on:submit|preventDefault={handleLogin}>
        <TextField outlined dense rules={tpRules} class="mb-4"
          >TP Number</TextField
        >
        <TextField
          outlined
          dense
          type={show ? 'text' : 'password'}
          rules={passwordRules}
          class="mb-4"
        >
          <span slot="append">
            <Button text icon on:click={() => (show = !show)}>
              <Icon class={`mdi ${!show ? 'mdi-eye' : 'mdi-eye-off'}`} />
            </Button>
          </span>
          Password
        </TextField>
        <Button
          type="submit"
          disabled={!inputs.password.isValid || !inputs.tpNumber.isValid}
          class={!inputs.password.isValid ||
            !inputs.tpNumber.isValid ||
            'primary-color'}
          block>Sign In</Button
        >
      </form>
      <div class="text-left red-text mt-4" hidden={loginIsValid}>
        Incorrect password or TP Number
      </div>
    </CardText>
  </Card>
</div>
