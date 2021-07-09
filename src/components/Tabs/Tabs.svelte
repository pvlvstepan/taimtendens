<script>
  export let tabs;
  export let currentTab;
  export let full;

  import { Button, Icon } from 'svelte-materialify';

  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  const changeTab = val => {
    dispatch('change', {
      id: val,
    });
    console.log(val);
  };
</script>

<div class="button_wrapper">
  {#each tabs as tab}
    <Button
      style={full ? 'flex: 1' : ''}
      text
      active={currentTab === tab.id ? true : false}
      size="large"
      class={currentTab === tab.id ? 'primary-text' : ''}
      on:click={() => changeTab(tab.id)}
    >
      <div class="button_elements">
        <Icon path={tab.icon} />
        <span>{tab.label}</span>
      </div>
    </Button>
  {/each}
</div>

<style>
  .button_wrapper {
    display: flex;
    flex-direction: row;
    column-gap: 10px;
    align-items: center;
    justify-content: center;
    flex: 1;
    height: 100%;
  }
  .button_elements {
    padding: 3px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>
