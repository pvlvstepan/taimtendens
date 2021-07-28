<script context="module">
  export async function preload(page, session) {
    if (!session.isLoggedIn) {
      return this.redirect(302, 'login');
    }
  }
</script>

<script>
  import { goto } from '@sapper/app';
  import { onMount } from 'svelte';
  import { CardTitle, Card } from 'svelte-materialify/src';

  onMount(() => {
    setTimeout(() => goto('dashboard'), 1000);
  });
</script>

<div class="d-flex justify-center align-center p-4" style="height:100vh;">
  <Card raised style="max-width:400px; width: 100%; border-radius">
    <CardTitle>Redirecting...</CardTitle>
  </Card>
</div>
