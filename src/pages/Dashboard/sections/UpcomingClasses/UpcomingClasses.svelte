<script>
  import ListItem from '../../../../Components/ListItem/ListItem.svelte';
  import Card from '../../../../Components/Card/Card.svelte';
  import { Button, Icon } from 'svelte-materialify';
  import { mdiArrowRight, mdiEmoticon } from '@mdi/js';
</script>

<Card>
  <svelte:fragment slot="card_title">Upcoming Classes</svelte:fragment>
  <svelte:fragment slot="card_body">
    <ListItem>
      <svelte:fragment slot="left_element">
        <Icon path={mdiEmoticon} />
      </svelte:fragment>
      <svelte:fragment slot="body_title">First List Item Title</svelte:fragment>
      <svelte:fragment slot="body_content">Some text here</svelte:fragment>
      <svelte:fragment slot="body_alt">
        There's more space if you need it...
      </svelte:fragment>
      <svelte:fragment slot="right_element">
        <Icon path={mdiEmoticon} />
      </svelte:fragment>
    </ListItem>
    <ListItem>
      <svelte:fragment slot="left_element">
        <Icon path={mdiEmoticon} />
      </svelte:fragment>
      <svelte:fragment slot="body_title">
        Second List Item Title
      </svelte:fragment>
      <svelte:fragment slot="body_content">Some text here</svelte:fragment>
      <svelte:fragment slot="body_alt">
        There's more space if you need it...
      </svelte:fragment>
      <svelte:fragment slot="right_element">
        <Icon path={mdiEmoticon} />
      </svelte:fragment>
    </ListItem>
  </svelte:fragment>
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
