<script>
  import CardWrapper from '../../components/CardWrapper/CardWrapper.svelte';
  import AttendaceSummary from './sections/AttendanceSummary/AttendanceSummary.svelte';
  import SemesterAttendance from './sections/SemesterAttendance/SemesterAttendance.svelte';
  import AttendanceLegends from './sections/AttendanceLegends/AttendanceLegends.svelte';
  import IntakeSelector from './sections/IntakeSelector/IntakeSelector.svelte';

  const intakes = ['UCDF1909ICT(SE)', 'UCDF2009ICT(SE)'];
</script>

<CardWrapper>
  <IntakeSelector {intakes} />
  <AttendaceSummary />
  <SemesterAttendance semesterID={1} />
  <SemesterAttendance semesterID={2} />
  <SemesterAttendance semesterID={3} />
  <SemesterAttendance semesterID={4} />
  <SemesterAttendance semesterID={5} />
  <AttendanceLegends />
</CardWrapper>
