<script>
  export let status;
  export let error;

  const dev = process.env.NODE_ENV === 'development';
</script>

<svelte:head>
  <title>{status}</title>
</svelte:head>

<div class="err-wrapper">
  <h1>{status}</h1>

  <h6 class="text-button">{error.message}</h6>

  {#if dev && error.stack}
    <pre>{error.stack}</pre>
  {/if}
</div>

<style>
  .err-wrapper {
    padding: 2em;
  }
  h1,
  h6 {
    margin: 0 auto;
  }

  h1 {
    font-size: 2.8em;
    font-weight: 700;
  }

  h6 {
    margin: 1em auto;
  }

  @media (min-width: 480px) {
    h1 {
      font-size: 4em;
    }
  }
</style>
