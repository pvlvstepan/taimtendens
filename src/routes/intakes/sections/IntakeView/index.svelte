<script>
  import {
    Button,
    Checkbox,
    Icon,
    Snackbar,
    TextField,
  } from 'svelte-materialify/src';

  import Card from '../../../../components/Card/Card.svelte';
  import ListItem from '../../../../components/ListItem/ListItem.svelte';

  export let intakes,
    intake_modules,
    intakeEditIsOpen,
    intakeAddisOpen,
    editingIntake;

  let sortedIntakes = intakes;

  const filterIntakes = term => {
    const SearchTerm = term;
    sortedIntakes = intakes.filter((value, index) => {
      return (
        (value.intake_id ? value.intake_id : '')
          .toLowerCase()
          .includes(SearchTerm.toLowerCase()) ||
        (value.intake_name ? value.intake_name : '')
          .toLowerCase()
          .includes(SearchTerm.toLowerCase())
      );
    });
  };

  let snackbar = false;
  let error = false;

  const changeActive = async (value, module_id, intake_id) => {
    const result = await fetch('intakes/editActive.json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        intake_id: intake_id,
        module_id: module_id,
        active: value ? 1 : 0,
      }),
    });

    const response = await result.json();

    if (response.error !== undefined) {
      error = true;
      snackbar = true;
      setTimeout(() => location.replace('/intakes'), 2000);
    } else {
      snackbar = true;
    }
  };
</script>

<Card>
  <svelte:fragment slot="card_title">
    <div class="row_items justify-space-between">
      Intakes
      <Button
        class="primary-color"
        on:click={() => {
          intakeAddisOpen = true;
        }}>Add intake</Button
      >
    </div>
  </svelte:fragment>
  <svelte:fragment slot="card_body">
    <TextField
      outlined
      dense
      class="mb-4"
      on:input={e => filterIntakes(e.target.value)}
    >
      <span slot="prepend">
        <Icon class="mdi mdi-layers-search" />
      </span>
      Search by intake name or intake ID</TextField
    >
    <div class="col_items">
      {#if sortedIntakes.length > 0}
        {#each sortedIntakes as item}
          <ListItem>
            <svelte:fragment slot="body_title"
              >{item.intake_name} -
              <span class="primary-text">{item.intake_id}</span
              ></svelte:fragment
            >
            <div class="row_items" slot="body_content">
              <Icon class="mdi mdi-account" size="16px" />
              <span class="green-text"
                >{item.total_students} students total</span
              >
            </div>
            <div class="col-items" slot="body_alt">
              {#each intake_modules as im}
                {#if im.intake_id === item.intake_id}
                  <div class="row_items">
                    <Checkbox
                      checked={im.active === 1}
                      on:change={e =>
                        changeActive(
                          e.target.checked,
                          im.module_id,
                          im.intake_id
                        )}
                    />
                    <div class="col_items">
                      <span>{im.module_name} ({im.module_id})</span>
                    </div>
                  </div>
                {/if}
              {/each}
            </div>
            <svelte:fragment slot="right_element">
              <Button
                text
                icon
                class="edit_button"
                on:click={() => {
                  editingIntake = item;
                  intakeEditIsOpen = true;
                }}
              >
                <Icon class="mdi mdi-pencil" />
              </Button>
            </svelte:fragment>
          </ListItem>
        {/each}
      {:else}
        <div class="no-classes">
          <h6>No intakes found</h6>
        </div>
      {/if}
    </div>
  </svelte:fragment>
</Card>

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
  .row_items {
    display: flex;
    flex-direction: row;
    column-gap: 8px;
    align-items: center;
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
  .col_items {
    flex: 1;
    display: flex;
    flex-direction: column;
    row-gap: 8px;
  }
</style>
