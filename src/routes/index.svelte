<script context="module">
  export async function preload(page, session) {
    if (session.isLoggedIn) {
      return this.redirect(302, 'dashboard');
    } else {
      return this.redirect(302, 'login');
    }
  }
</script>

<svelte:head>
  <title>TaimTendens</title>
</svelte:head>
