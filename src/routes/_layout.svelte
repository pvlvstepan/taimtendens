<script context="module">
  export async function preload(page, session) {
    if (!session.isLoggedIn) {
      return this.redirect(302, 'login');
    }

    const { token } = session;

    const resultUsers = await this.fetch('dashboard/user.json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ token: token }),
    });

    const user = await resultUsers.json();

    return {
      user: user[0],
    };
  }
</script>

<script>
  import { MaterialApp } from 'svelte-materialify/src';
  import TopNavBar from '../components/TopNavBar/index.svelte';
  import '../../static/global.css';
  import AttendanceModal from '../components/AttendanceModal/AttendanceModal.svelte';

  export let segment;
  export let user;

  let theme = 'light';
  const toggleTheme = () => {
    if (theme === 'light') theme = 'dark';
    else theme = 'light';
  };

  const adminPages = [
    {
      title: 'Users',
      href: 'users',
      icon: 'mdi-account',
    },
    {
      title: 'Intakes',
      href: 'intakes',
      icon: 'mdi-school',
    },
    {
      title: 'Modules',
      href: 'modules',
      icon: 'mdi-book-open-variant',
    },
  ];

  const pages = [
    {
      title: 'Dashboard',
      href: 'dashboard',
      icon: 'mdi-view-dashboard',
    },
    {
      title: 'Attendance',
      href: 'attendance',
      icon: 'mdi-clock-check',
    },
    {
      title: 'Timetable',
      href: 'timetable',
      icon: 'mdi-timetable',
    },
  ];

  if (user.role_id === 2) {
    pages.push(...adminPages);
  }
</script>

<MaterialApp {theme}>
  <main class="page">
    {#if segment !== 'login' && segment !== 'logout'}
      <TopNavBar {segment} {pages} {toggleTheme} />
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
