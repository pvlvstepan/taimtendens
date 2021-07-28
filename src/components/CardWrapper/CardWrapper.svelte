<div class="card-wrapper">
  <slot />
</div>

<style>
  .card-wrapper {
    max-width: 700px;
    margin: 0 auto;
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: column;
    row-gap: 20px;
  }
</style>
