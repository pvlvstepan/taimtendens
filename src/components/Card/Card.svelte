<script>
</script>

<div class="card rounded-lg elevation-4">
  <slot />
  {#if $$slots.card_title}
    <h6 class="card_title primary-text"><slot name="card_title" /></h6>
  {/if}
  {#if $$slots.card_body}
    <div class="card_body"><slot name="card_body" /></div>
  {/if}
  {#if $$slots.card_footer}
    <div class="card_footer"><slot name="card_footer" /></div>
  {/if}
</div>

<style>
  .card {
    width: 100%;
    padding: 15px;
    display: flex;
    flex-direction: column;
    row-gap: 15px;
    background-color: var(--theme-cards);
  }
  .card_title {
    font-weight: 500;
    line-height: 1;
  }
  .card_body {
    display: flex;
    flex-direction: column;
    row-gap: 15px;
  }
</style>
