<script context="module">
  export async function preload(page, session) {
    return this.redirect(302, 'dashboard');
  }
</script>

<svelte:head>
  <title>TaimTendens</title>
</svelte:head>
