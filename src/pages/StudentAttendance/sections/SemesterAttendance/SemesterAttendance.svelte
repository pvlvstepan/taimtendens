<script>
  import { mdiChevronRight } from '@mdi/js';
  import Card from '../../../../Components/Card/Card.svelte';
  import { Button, Icon, Col, Row } from 'svelte-materialify';
  import { tabValue } from '../../../../store/store';
  import ListItem from '../../../../Components/ListItem/ListItem.svelte';
  export let semesterID;
</script>

<Card>
  <svelte:fragment slot="card_title">{'Semester ' + semesterID}</svelte:fragment
  >
  <svelte:fragment slot="card_body">
    <div class="col_items small space">
      <div class="col_items">
        <ListItem>
          <svelte:fragment slot="body_title">MODULE 1</svelte:fragment>
          <div class="green-text" slot="body_alt">10/12 Classes (83%)</div>
          <svelte:fragment slot="right_element">
            <Button text on:click={() => tabValue.set(1)}>
              <Icon path={mdiChevronRight} class="ml-1" />
            </Button>
          </svelte:fragment>
        </ListItem>
        <ListItem>
          <svelte:fragment slot="body_title">MODULE 2</svelte:fragment>
          <div class="green-text" slot="body_alt">9/9 Classes (100%)</div>
          <svelte:fragment slot="right_element">
            <Button text on:click={() => tabValue.set(1)}>
              <Icon path={mdiChevronRight} class="ml-1" />
            </Button>
          </svelte:fragment>
        </ListItem>
        <ListItem>
          <svelte:fragment slot="body_title">MODULE 3</svelte:fragment>
          <div class="red-text" slot="body_alt">7/9 Classes (78%)</div>
          <svelte:fragment slot="right_element">
            <Button text on:click={() => tabValue.set(1)}>
              <Icon path={mdiChevronRight} class="ml-1" />
            </Button>
          </svelte:fragment>
        </ListItem>
        <ListItem>
          <svelte:fragment slot="body_title">MODULE 4</svelte:fragment>
          <div class="green-text" slot="body_alt">13/14 Classes (93%)</div>
          <svelte:fragment slot="right_element">
            <Button text on:click={() => tabValue.set(1)}>
              <Icon path={mdiChevronRight} class="ml-1" />
            </Button>
          </svelte:fragment>
        </ListItem>
        <ListItem>
          <svelte:fragment slot="body_title">MODULE 4</svelte:fragment>
          <div class="green-text" slot="body_alt">13/14 Classes (93%)</div>
          <svelte:fragment slot="right_element">
            <Button text on:click={() => tabValue.set(1)}>
              <Icon path={mdiChevronRight} class="ml-1" />
            </Button>
          </svelte:fragment>
        </ListItem>
      </div>
    </div>
  </svelte:fragment>
</Card>

<style>
  .col_items {
    flex: 1;
    display: flex;
    flex-direction: column;
    row-gap: 8px;
  }
  .col_items.small {
    flex: none;
  }
  .col_items.space {
    justify-content: space-between;
  }
</style>
