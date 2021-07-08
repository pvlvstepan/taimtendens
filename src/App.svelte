<script>
  import { MaterialApp, Window, WindowItem } from 'svelte-materialify';
  import Header from './Components/Header/Header.svelte';
  import AttendanceModal from './Components/AttendanceModal/AttendanceModal.svelte';
  import Dashboard from './pages/Dashboard/Dashboard.svelte';
  import StudentAttendance from './pages/StudentAttendance/StudentAttendance.svelte';
  import StudentTimetable from './pages/StudentTimetable/StudentTimetable.svelte';
  import { tabValue } from './store/store';

  let theme = 'light';

  const toggleTheme = () => {
    if (theme === 'light') theme = 'dark';
    else theme = 'light';
  };

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
      <StudentAttendance />
    </WindowItem>
    <WindowItem>
      <StudentTimetable />
    </WindowItem>
  </Window>
  <AttendanceModal />
</MaterialApp>

<style>
</style>
