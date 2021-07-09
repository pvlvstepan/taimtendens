<script>
  import CardWrapper from '../../components/CardWrapper/CardWrapper.svelte';
  import AttendaceSummary from './sections/AttendanceSummary/AttendanceSummary.svelte';
  import SemesterAttendance from './sections/SemesterAttendance/SemesterAttendance.svelte';
  import AttendanceLegends from './sections/AttendanceLegends/AttendanceLegends.svelte';
</script>

<CardWrapper>
  <AttendaceSummary />
  <SemesterAttendance semesterID={1} />
  <SemesterAttendance semesterID={2} />
  <SemesterAttendance semesterID={3} />
  <SemesterAttendance semesterID={4} />
  <SemesterAttendance semesterID={5} />
  <AttendanceLegends />
</CardWrapper>
