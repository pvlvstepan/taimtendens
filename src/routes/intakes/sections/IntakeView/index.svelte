<script>
  import { Button, Icon, TextField } from 'svelte-materialify/src';

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
            <div class="row_items align-start" slot="body_alt">
              <Icon class="mdi mdi-school" size="16px" />
              <div class="col_items">
                {#each intake_modules as im}
                  {#if im.intake_id === item.intake_id}
                    <span style={`opacity: ${im.active === 1 ? '1' : '0.5'}`}
                      >{im.module_name} ({im.module_id})</span
                    >
                  {/if}
                {/each}
              </div>
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

<style>
  .row_items {
    display: flex;
    flex-direction: row;
    column-gap: 8px;
    align-items: center;
  }
  .row_items.align-start {
    align-items: flex-start;
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
