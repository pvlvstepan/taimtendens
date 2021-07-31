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

  export let active, modules, intake_modules, intake;

  const activeModules = intake_modules
    .map(val => {
      if (val.intake_id === intake.intake_id) {
        return val.module_id;
      }
    })
    .filter(function (element) {
      return element !== undefined;
    });

  let selectedModules = activeModules;

  $: selectedModules, checkSelection();

  const inputs = {
    intake_id: {
      value: intake.intake_id,
      isValid: true,
    },
    intake_name: {
      value: intake.intake_name,
      isValid: true,
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

  const editIntake = async () => {
    const result = await fetch('intakes/editIntake.json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        intake_id: inputs.intake_id.value,
        intake_name: inputs.intake_name.value,
        modules: inputs.selectedModules.value,
        activeModules: activeModules,
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
      <svelte:fragment slot="card_title">Edit Intake</svelte:fragment>
      <form slot="card_body">
        <TextField
          disabled
          dense
          outlined
          class="mb-4"
          bind:value={inputs.intake_id.value}>Intake ID</TextField
        >
        <TextField
          rules={intakeNamerules}
          dense
          outlined
          class="mb-4"
          bind:value={inputs.intake_name.value}>Intake Name</TextField
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
          on:click={() => editIntake()}>Save Changes</Button
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
