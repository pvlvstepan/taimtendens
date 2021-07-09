<script>
  import CardWrapper from '../../components/CardWrapper/CardWrapper.svelte';
  import AttendanceSummary from './sections/AttendanceSummary/AttendanceSummary.svelte';
  import ProfilePreview from './sections/ProfilePreview/ProfilePreview.svelte';
  import UpcomingClasses from './sections/UpcomingClasses/UpcomingClasses.svelte';
</script>

<CardWrapper>
  <ProfilePreview />
  <UpcomingClasses />
  <AttendanceSummary />
</CardWrapper>
