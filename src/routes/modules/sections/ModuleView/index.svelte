<script>
  import { Button, Icon, TextField } from 'svelte-materialify/src';

  import Card from '../../../../components/Card/Card.svelte';
  import ListItem from '../../../../components/ListItem/ListItem.svelte';

  export let modules,
    intake_modules,
    moduleAddisOpen,
    moduleEditIsOpen,
    editingModule;

  let sortedModules = modules;

  const filterModules = term => {
    const SearchTerm = term;
    sortedModules = modules.filter((value, index) => {
      return (
        (value.first_name + ' ' + value.last_name)
          .toLowerCase()
          .includes(SearchTerm.toLowerCase()) ||
        (value.module_id ? value.module_id : '')
          .toLowerCase()
          .includes(SearchTerm.toLowerCase()) ||
        (value.module_name ? value.module_name : '')
          .toLowerCase()
          .includes(SearchTerm.toLowerCase())
      );
    });
  };
</script>

<Card>
  <svelte:fragment slot="card_title">
    <div class="row_items justify-space-between">
      Modules
      <Button
        class="primary-color"
        on:click={() => {
          moduleAddisOpen = true;
        }}>Add module</Button
      >
    </div>
  </svelte:fragment>
  <svelte:fragment slot="card_body">
    <TextField
      outlined
      dense
      class="mb-4"
      on:input={e => filterModules(e.target.value)}
    >
      <span slot="prepend">
        <Icon class="mdi mdi-text-box-search" />
      </span>
      Search by module name, module ID or lecturer's name</TextField
    >
    <div class="col_items">
      {#if sortedModules.length > 0}
        {#each sortedModules as item}
          <ListItem>
            <svelte:fragment slot="body_title"
              >{item.module_name} ({item.module_id})</svelte:fragment
            >
            <div class="row_items" slot="body_content">
              {#if item.first_name && item.last_name}
                <Icon class="mdi mdi-account" size="16px" />
                <span class="green-text"
                  >{item.first_name}
                  {item.last_name}</span
                >
              {:else}
                <Icon class="mdi mdi-account" size="16px" />
                <span class="red-text">Lecturer is not assigned!</span>
              {/if}
            </div>
            <div class="row_items" slot="body_alt">
              <Icon class="mdi mdi-school" size="16px" />
              <div class="col_items">
                {#each intake_modules as im}
                  {#if im.module_id === item.module_id}
                    {im.intake_id} {im.active === 0 ? '(Inactive)' : ''}
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
                  editingModule = item;
                  moduleEditIsOpen = true;
                }}
              >
                <Icon class="mdi mdi-book-edit" />
              </Button>
            </svelte:fragment>
          </ListItem>
        {/each}
      {:else}
        <div class="no-classes">
          <h6>No modules found</h6>
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
