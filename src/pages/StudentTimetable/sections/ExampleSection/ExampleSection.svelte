<script>
  import Card from '../../../../components/Card/Card.svelte';
</script>

<Card>
  <svelte:fragment slot="card_title">Example Page Section</svelte:fragment>
  <svelte:fragment slot="card_body">You can put components here</svelte:fragment
  >
  <svelte:fragment slot="card_footer">Action Buttons go here...</svelte:fragment
  >
</Card>
