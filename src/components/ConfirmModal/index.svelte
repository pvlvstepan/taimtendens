<script>
  import { Button, Dialog, Icon } from 'svelte-materialify/src';
  import Card from '../../components/Card/Card.svelte';

  export let active;
  export let message;
  export let action;
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
      <svelte:fragment slot="card_title">Confirmation</svelte:fragment>
      <div class="card_body" slot="card_body">
        <h6 class="text-body-1">
          {message}
        </h6>
      </div>
      <div slot="card_footer" class="button_wrapper">
        <Button on:click={() => (active = false)} text>Cancel</Button>
        <Button on:click={action} class="primary-color">Yes</Button>
      </div>
    </Card>
  </div>
</Dialog>

<style>
  .card_body {
    padding-top: 30px;
    display: flex;
    align-items: center;
    flex-direction: column;
    row-gap: 15px;
  }
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
