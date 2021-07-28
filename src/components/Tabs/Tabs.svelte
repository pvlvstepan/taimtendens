<script>
  export let tabs;
  export let currentTab;
  export let full;

  import { Button, Icon } from 'svelte-materialify/src';

  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  const changeTab = val => {
    dispatch('change', {
      id: val,
    });
  };
</script>

<div class="button_wrapper">
  {#each tabs as tab}
    <Button
      text
      active={currentTab === tab.id ? true : false}
      style={`pointer-events: ${currentTab === tab.id ? 'none;' : 'all;'} ${
        full ? 'flex: 1' : ''
      }`}
      size="large"
      class={currentTab === tab.id ? 'primary-text' : ''}
      on:click={() => changeTab(tab.id)}
    >
      <div class="button_elements">
        {#if tab.icon}<Icon class={`mdi ${tab.icon}`} />{/if}
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
