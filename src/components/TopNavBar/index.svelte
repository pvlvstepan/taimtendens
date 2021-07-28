<script>
  export let toggleTheme;
  export let segment;

  import { AppBar, Button, Icon } from 'svelte-materialify/src';
  import { goto, stores } from '@sapper/app';
  const { session } = stores();

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

  let pages = [
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

  const loadUser = async () => {
    const resultUsers = await fetch('dashboard/user.json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ token: $session.token }),
    });

    const user = await resultUsers.json();

    if (user[0].role_id === 2) {
      pages.push(...adminPages);
      pages = [...pages];
    }
  };

  $: $session.token, loadUser();
</script>

<AppBar style="position: relative">
  <span slot="title"
    ><h5 class="d-flex align-items-center">
      <Icon class="mdi mdi-clock-fast" /> TaimTendens
    </h5></span
  >
  <span style="flex: 1" />
  <div class="tabs_wrapper">
    <div class="button_wrapper">
      {#each pages as page}
        <Button
          text
          active={segment === page.href ? true : false}
          size="large"
          class={segment === page.href ? 'primary-text' : ''}
          on:click={() => goto(page.href)}
        >
          <div class="button_elements">
            <Icon class={`mdi ${page.icon}`} />
            <span>{page.title}</span>
          </div>
        </Button>
      {/each}
    </div>
  </div>
  <Button on:click={toggleTheme} icon style="margin-right: 16px">
    <Icon class="mdi mdi-theme-light-dark" />
  </Button>
</AppBar>

<style>
  .tabs_wrapper {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
  .button_wrapper {
    display: flex;
    flex-direction: row;
    column-gap: 10px;
    align-items: center;
    justify-content: center;
    flex: 1;
    height: 100%;
  }
  .button_elements {
    padding: 3px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>
