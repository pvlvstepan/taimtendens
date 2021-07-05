<script>
  import Card from '../../Components/Card/Card.svelte';
  import CardWrapper from '../../Components/CardWrapper/CardWrapper.svelte';
  import AttendanceSummary from './sections/AttendanceSummary/AttendanceSummary.svelte';
  import ProfilePreview from './sections/ProfilePreview/ProfilePreview.svelte';
  import UpcomingClasses from './sections/UpcomingClasses/UpcomingClasses.svelte';
</script>

<CardWrapper>
  <ProfilePreview />
  <UpcomingClasses />
  <AttendanceSummary />
</CardWrapper>
