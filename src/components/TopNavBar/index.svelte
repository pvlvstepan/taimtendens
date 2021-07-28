<script>
  export let toggleTheme;
  export let segment;
  export let pages;

  import { AppBar, Button, Icon } from 'svelte-materialify/src';
  import { goto } from '@sapper/app';
</script>

<AppBar style="position: relative">
  <span slot="title"
    ><h5 class="d-flex align-items-center">
      <Icon class="mdi mdi-clock-fast" /> TaimTendens
    </h5></span
  >
  <span style="flex: 1" />
  <div class="tabs_wrapper">
    <div class="button_wrapper">
      {#each pages as page}
        <Button
          text
          active={segment === page.href ? true : false}
          size="large"
          class={segment === page.href ? 'primary-text' : ''}
          on:click={() => goto(page.href)}
        >
          <div class="button_elements">
            <Icon class={`mdi ${page.icon}`} />
            <span>{page.title}</span>
          </div>
        </Button>
      {/each}
    </div>
  </div>
  <Button on:click={toggleTheme} icon style="margin-right: 16px">
    <Icon class="mdi mdi-theme-light-dark" />
  </Button>
</AppBar>

<style>
  .tabs_wrapper {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
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
