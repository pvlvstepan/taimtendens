<script>
  import Card from '../../../../Components/Card/Card.svelte';

  export let semesterID;
</script>

<Card>
  <svelte:fragment slot="card_title">{'Semester ' + semesterID}</svelte:fragment
  >
  <svelte:fragment slot="card_body">You can put components here</svelte:fragment
  >
  <svelte:fragment slot="card_footer">Action Buttons go here...</svelte:fragment
  >
</Card>
