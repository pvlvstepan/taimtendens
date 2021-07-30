<script>
  import { MaterialApp } from 'svelte-materialify/src';
  import TopNavBar from '../components/TopNavBar/index.svelte';
  import '../../static/global.css';
  import AttendanceModal from '../components/AttendanceModal/AttendanceModal.svelte';

  export let segment;
</script>

<MaterialApp>
  <main class="page">
    {#if segment !== 'login' && segment !== 'logout'}
      <TopNavBar {segment} />
    {/if}
    <slot />
  </main>
  {#if segment !== 'login' && segment !== 'logout'}
    <AttendanceModal />
  {/if}
</MaterialApp>

<style>
  .page {
    min-height: 100vh;
  }
</style>
