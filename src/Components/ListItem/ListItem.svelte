<script>
</script>

<div class="list-item">
  {#if $$slots.left_element}
    <div class="item-left-el">
      <slot name="left_element" />
    </div>
  {/if}
  <div class="item-body">
    <p class="body_title"><slot name="body_title" /></p>
    {#if $$slots.body_content}
      <p class="body_content"><slot name="body_content" /></p>
    {/if}
    {#if $$slots.body_alt}
      <p class="body_alt"><slot name="body_alt" /></p>
    {/if}
  </div>
  {#if $$slots.right_element}
    <div class="item-right-el">
      <slot name="right_element" />
    </div>
  {/if}
</div>

<style lang="scss">
  .list-item {
    display: flex;
    align-items: center;
    padding: 8px 16px;
    border-radius: 8px;
    background-color: var(--theme-app-bar);
    column-gap: 16px;
  }
  .item-body {
    flex: 1;
    display: flex;
    flex-direction: column;
    row-gap: 4px;
    align-items: center;
    width: 100%;
  }
  .body_title {
    width: 100%;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    margin-bottom: 0;
    letter-spacing: 0.01em;
  }
  .body_content,
  .body_alt {
    width: 100%;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    margin-bottom: 0;
    letter-spacing: 0.005em;
    color: var(--theme-text-secondary);
  }
  .item-right-el,
  .item-left-el {
    min-width: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
