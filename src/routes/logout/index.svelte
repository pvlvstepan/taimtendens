<script context="module">
  export async function preload(page, session) {
    return await this.fetch('logout.json', {
      body: JSON.stringify(session),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST'
    });
  }
</script>

<script>
  // imports
  import { stores } from '@sapper/app';
  import { onMount } from 'svelte';
  import { CardTitle, Card } from 'svelte-materialify/src';
  const { session } = stores();
  session.set({});
  onMount(() => {
    setTimeout(() => location.replace('/'), 2500);
  });
</script>

<svelte:head><title>TaimTendens | Logout</title></svelte:head>

<div class="d-flex justify-center align-center p-4" style="height:100vh;">
  <Card raised style="max-width:400px; width: 100%; border-radius">
    <CardTitle>Loggin out...</CardTitle>
  </Card>
</div>
