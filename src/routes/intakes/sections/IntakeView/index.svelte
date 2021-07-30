<script>
  import { Button } from 'svelte-materialify/src';

  import Card from '../../../../components/Card/Card.svelte';
</script>

<Card>
  <svelte:fragment slot="card_title">
    <div class="row_items justify-space-between">
      Intakes
      <Button class="primary-color">Add intake</Button>
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
