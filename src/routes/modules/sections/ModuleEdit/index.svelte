<script>
  import {
    Button,
    Dialog,
    Icon,
    Snackbar,
    TextField
  } from 'svelte-materialify/src';
  import Card from '../../../../components/Card/Card.svelte';

  export let active, item;

  const inputs = {
    module_id: {
      value: item.module_id,
      isValid: true
    },
    module_name: {
      value: item.module_name,
      isValid: true
    }
  };

  const moduleIDrules = [
    v => {
      inputs.module_id.value = v;
      if (!v) {
        inputs.module_id.isValid = false;
        return 'Please enter module ID';
      }
      inputs.module_id.isValid = true;
      return false;
    },
    v => {
      inputs.module_id.value = v;
      const pattern = /^TT-\d\d\d-\d-\d-[A-Z]+$/;
      if (!pattern.test(v)) {
        inputs.module_id.isValid = false;
        return 'Module ID should follow the TT-NNN-N-N-XXX format';
      }
      inputs.module_id.isValid = true;
      return false;
    }
  ];

  const moduleNamerules = [
    v => {
      inputs.module_name.value = v;
      if (!v) {
        inputs.module_name.isValid = false;
        return 'Please enter module name';
      }
      inputs.module_name.isValid = true;
      return false;
    },
    v => {
      inputs.module_name.value = v;
      const pattern = /^\w+( \w+)*$/;
      if (!pattern.test(v)) {
        inputs.module_name.isValid = false;
        return 'Incorrect module name';
      }
      inputs.module_name.isValid = true;
      return false;
    }
  ];

  let snackbar = false;
  let error = false;

  const editModule = async () => {
    const result = await fetch('modules/editModule.json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        module_id: inputs.module_id.value,
        module_name: inputs.module_name.value
      })
    });

    const response = await result.json();

    if (response.error !== undefined) {
      error = true;
      snackbar = true;
      setTimeout(() => (active = false), 2000);
    } else {
      snackbar = true;
      setTimeout(() => location.replace('/modules'), 2000);
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
      <svelte:fragment slot="card_title"
        >Edit module {item.module_id}</svelte:fragment
      >
      <form slot="card_body">
        <TextField
          bind:value={inputs.module_id.value}
          rules={moduleIDrules}
          dense
          outlined
          disabled
          class="mb-4">Module ID</TextField
        >
        <TextField
          bind:value={inputs.module_name.value}
          rules={moduleNamerules}
          dense
          outlined>Module Name</TextField
        >
      </form>
      <div slot="card_footer" class="button_wrapper">
        <Button on:click={() => (active = false)} text>Cancel</Button>
        <Button
          disabled={!inputs.module_id.isValid || !inputs.module_name.isValid}
          class={!inputs.module_id.isValid || !inputs.module_name.isValid
            ? ''
            : 'primary-color'}
          on:click={() => editModule()}>Save Changes</Button
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
