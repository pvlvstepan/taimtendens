<script>
  import Card from '../../../../Components/Card/Card.svelte';
</script>

<Card>
  <svelte:fragment slot="card_title">Legend</svelte:fragment>

  <div slot="card_body">
    <p style="text-align:left;">
      ***
      <span style="float:right;">
        Check on final week of your course schedule
      </span>
    </p>
    <p style="text-align:left;">
      BA
      <span style="float:right;">
        Not eligible to sit for exam due to attendance below 80%
      </span>
    </p>
    <p style="text-align:left;">
      BD
      <span style="float:right;">
        Not eligible to sit for exam due to overdue bankdraft
      </span>
    </p>
    <p style="text-align:left;">
      BF
      <span style="float:right;">
        Not eligible to sit for exam due to overdue fee
      </span>
    </p>
    <p style="text-align:left;">
      Eligible
      <span style="float:right;"> Eligible to sit for exam </span>
    </p>
    <p style="text-align:left;">
      N/A
      <span style="float:right;"> Not Applicable </span>
    </p>
  </div>
</Card>
