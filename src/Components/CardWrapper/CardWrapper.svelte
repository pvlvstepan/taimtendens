<div class="card-wrapper">
  <slot />
</div>

<style lang="scss">
  .card-wrapper {
    max-width: 700px;
    margin: 20px auto;
    padding: 0 20px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: column;
    row-gap: 20px;
  }
</style>
