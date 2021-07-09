<script>
  import Card from '../../../../components/Card/Card.svelte';
</script>

<Card>
  <svelte:fragment slot="card_title">Legend</svelte:fragment>
  <div slot="card_body" class="legend">
    <div class="legend-item">
      <span class="el-right"> *** </span>
      <span class="el-desc"> Check on final week of your course schedule </span>
    </div>
    <hr />
    <div class="legend-item">
      <span class="el-right"> OK </span>
      <span class="el-desc"> Eligible to sit for exam </span>
    </div>
    <hr />
    <div class="legend-item">
      <span class="el-right"> N/A </span>
      <span class="el-desc"> Not Applicable </span>
    </div>
    <hr />
    <div class="legend-item">
      <span class="el-right"> BA </span>
      <span class="el-desc">
        Not eligible to sit for exam due to attendance below 80%
      </span>
    </div>
  </div>
</Card>

<style>
  .legend {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    row-gap: 8px;
  }
  .legend hr {
    min-width: 100%;
  }
  .legend-item {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    min-width: 100%;
    column-gap: 15px;
  }
  .el-right {
    width: 20%;
  }
  .el-desc {
    text-align: right;
  }
</style>
