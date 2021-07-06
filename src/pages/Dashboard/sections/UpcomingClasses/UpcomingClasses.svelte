<script>
  import { Button, Icon } from 'svelte-materialify';
  import Card from '../../../../Components/Card/Card.svelte';
  import { mdiArrowRight } from '@mdi/js';
</script>

<Card>
  <svelte:fragment slot="card_title">Upcoming Classes</svelte:fragment>
  <svelte:fragment slot="card_body">Body elements go here...</svelte:fragment>
  <svelte:fragment slot="card_footer">
    <div class="button_wrapper">
      <Button text>
        Weekly Schedule
        <Icon path={mdiArrowRight} class="ml-1" />
      </Button>
    </div>
  </svelte:fragment>
</Card>

<style lang="scss">
  .button_wrapper {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
</style>
