<script>
  import { MaterialApp, Window, WindowItem } from 'svelte-materialify';
  import Header from './Components/Header/Header.svelte';
  import Dashboard from './pages/Dashboard/Dashboard.svelte';
  let theme = 'light';

  const toggleTheme = () => {
    if (theme === 'light') theme = 'dark';
    else theme = 'light';
  };

  import { tabValue } from './store/store';

  let tabIndex;

  tabValue.subscribe((value) => {
    tabIndex = value;
  });
</script>

<MaterialApp {theme}>
  <Header {toggleTheme} />
  <Window value={tabIndex}>
    <WindowItem>
      <Dashboard />
    </WindowItem>
    <WindowItem>
      <h4>Page 2</h4>
    </WindowItem>
    <WindowItem>
      <h4>Page 3</h4>
    </WindowItem>
  </Window>
</MaterialApp>

<style>
</style>
