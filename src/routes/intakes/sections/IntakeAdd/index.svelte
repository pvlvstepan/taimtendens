<script>
  import {
    Button,
    Dialog,
    Icon,
    Select,
    Snackbar,
    TextField,
  } from 'svelte-materialify/src';
  import Card from '../../../../components/Card/Card.svelte';

  export let active, modules;

  let selectedModules = [];

  $: selectedModules, checkSelection();

  const inputs = {
    intake_id: {
      value: '',
      isValid: false,
    },
    intake_name: {
      value: '',
      isValid: false,
    },
    selectedModules: {
      value: selectedModules,
      isValid: false,
    },
  };

  const checkSelection = () => {
    inputs.selectedModules.value = selectedModules;
    if (selectedModules.length > 0) {
      inputs.selectedModules.isValid = true;
    } else {
      inputs.selectedModules.isValid = false;
    }
  };

  const intakeIDrules = [
    v => {
      inputs.intake_id.value = v;
      if (!v) {
        inputs.intake_id.isValid = false;
        return 'Please enter intake ID';
      }
      inputs.intake_id.isValid = true;
      return false;
    },
    v => {
      inputs.intake_id.value = v;
      const pattern = /^[A-Z]+\d\d\d\d[A-Z]+(?:\([A-Z]+\))?$/;
      if (!pattern.test(v)) {
        inputs.intake_id.isValid = false;
        return 'Incorrect intake ID format. Example: UCDF1909ICT(SE)';
      }
      inputs.intake_id.isValid = true;
      return false;
    },
  ];

  const intakeNamerules = [
    v => {
      inputs.intake_name.value = v;
      if (!v) {
        inputs.intake_name.isValid = false;
        return 'Please enter intake name';
      }
      inputs.intake_name.isValid = true;
      return false;
    },
    v => {
      inputs.intake_name.value = v;
      const pattern = /^\w+( \w+)*$/;
      if (!pattern.test(v)) {
        inputs.intake_name.isValid = false;
        return 'Incorrect intake name';
      }
      inputs.intake_name.isValid = true;
      return false;
    },
  ];

  let snackbar = false;
  let error = false;

  const addIntake = async () => {
    const result = await fetch('intakes/addIntake.json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        intake_id: inputs.intake_id.value,
        intake_name: inputs.intake_name.value,
        modules: inputs.selectedModules.value,
      }),
    });

    const response = await result.json();

    if (response.error !== undefined) {
      error = true;
      snackbar = true;
      setTimeout(() => (active = false), 2000);
    } else {
      snackbar = true;
      setTimeout(() => location.replace('/intakes'), 2000);
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
      <svelte:fragment slot="card_title">Add new intake</svelte:fragment>
      <form slot="card_body">
        <TextField rules={intakeIDrules} dense outlined class="mb-4"
          >Intake ID</TextField
        >
        <TextField rules={intakeNamerules} dense outlined class="mb-4"
          >Intake Name</TextField
        >
        <Select
          dense
          outlined
          multiple
          items={modules}
          class="mb-4"
          bind:value={selectedModules}>Assigned Modules</Select
        >
      </form>
      <div slot="card_footer" class="button_wrapper">
        <Button on:click={() => (active = false)} text>Cancel</Button>
        <Button
          disabled={!inputs.intake_id.isValid ||
            !inputs.intake_name.isValid ||
            !inputs.selectedModules.isValid}
          class={!inputs.intake_id.isValid ||
          !inputs.intake_name.isValid ||
          !inputs.selectedModules.isValid
            ? ''
            : 'primary-color'}
          on:click={() => addIntake()}>Add Intake</Button
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
  {error === false ? 'Intake Added Successfuly' : 'Something went wrong...'}
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
