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
      <h4>Item 2</h4>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec accumsan,
        diam et elementum gravida, arcu mi fermentum nibh, vel dapibus ligula
        orci non est. Morbi commodo sagittis finibus. Maecenas in volutpat
        massa. Nullam vulputate metus velit, quis interdum elit imperdiet ut.
        Suspendisse et sagittis erat, euismod vulputate enim. Etiam feugiat sit
        amet justo vitae commodo.
      </p>
    </WindowItem>
    <WindowItem>
      <h4>Item 3</h4>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec accumsan,
        diam et elementum gravida, arcu mi fermentum nibh, vel dapibus ligula
        orci non est. Morbi commodo sagittis finibus. Maecenas in volutpat
        massa. Nullam vulputate metus velit, quis interdum elit imperdiet ut.
        Suspendisse et sagittis erat, euismod vulputate enim. Etiam feugiat sit
        amet justo vitae commodo.
      </p>
    </WindowItem>
  </Window>
</MaterialApp>

<style>
</style>
