<script>
  import { Select } from 'svelte-materialify';
  import Card from '../../../../components/Card/Card.svelte';

  export let intakes;
</script>

<Card>
  <div slot="card_body">
    <Select items={intakes} outlined value={intakes[0]}>Intake</Select>
  </div>
</Card>
