<script>
  import Card from "../../../../Components/Card/Card.svelte";
  import Tabs from "../../../../Components/Tabs/Tabs.svelte";
  import ListItem from "../../../../Components/ListItem/ListItem.svelte";
  import { Window, WindowItem, AppBar } from "svelte-materialify";

  const tabs = [
    {id: 0,label: 'Monday',},
    {id: 1,label: 'Tuesday'},
    {id: 2,label: 'Wednesday'},
    {id: 3,label: 'Thursday'},
    {id: 4,label: 'Friday'},
  ];

  let currentTab = 0;

  const changeTab = e => {
    currentTab = e.detail.id;
  };
</script>

<Card>
  <svelte:fragment slot="card_title">Timetable</svelte:fragment>
  <svelte:fragment slot="card_body">
    <Tabs {tabs} {currentTab} on:change={changeTab} full />
    <Window value={currentTab}>
      <WindowItem class='col_items'>
          <ListItem>
            <svelte:fragment slot="body_title">Sex Education</svelte:fragment>
            <div slot="body_alt">
              10.30am - 11.30am
              <div>Lecturer: Mr. Sanmugam</div>
            </div>
          </ListItem>
          <ListItem>
            <svelte:fragment slot="body_title">BDSM 101</svelte:fragment>
            <div slot="body_alt">
              12.00pm - 2.00pm
              <div>Lecturer: Dm Lecturer</div>
            </div>
          </ListItem>
      </WindowItem>
      <WindowItem>
          <ListItem>
            <svelte:fragment slot="body_title">Sex Education</svelte:fragment>
            <div slot="body_alt">
              10.30am - 11.30am
              <div>Lecturer: Mr. Sanmugam</div>
            </div>
          </ListItem>
          <ListItem>
            <svelte:fragment slot="body_title">BDSM 101</svelte:fragment>
            <div slot="body_alt">
              12.00pm - 2.00pm
              <div>Lecturer: Dm Lecturer</div>
            </div>
          </ListItem>
      </WindowItem>
      <WindowItem>
          <ListItem>
            <svelte:fragment slot="body_title">Sex Education</svelte:fragment>
            <div slot="body_alt">
              10.30am - 11.30am
              <div>Lecturer: Mr. Sanmugam</div>
            </div>
          </ListItem>
          <ListItem>
            <svelte:fragment slot="body_title">BDSM 101</svelte:fragment>
            <div slot="body_alt">
              12.00pm - 2.00pm
              <div>Lecturer: Dm Lecturer</div>
            </div>
          </ListItem>
      </WindowItem>
      <WindowItem>
          <ListItem>
            <svelte:fragment slot="body_title">Sex Education</svelte:fragment>
            <div slot="body_alt">
              10.30am - 11.30am
              <div>Lecturer: Mr. Sanmugam</div>
            </div>
          </ListItem>
          <ListItem>
            <svelte:fragment slot="body_title">BDSM 101</svelte:fragment>
            <div slot="body_alt">
              12.00pm - 2.00pm
              <div>Lecturer: Dm Lecturer</div>
            </div>
          </ListItem>
      </WindowItem>
      <WindowItem>
          <ListItem>
            <svelte:fragment slot="body_title">Sex Education</svelte:fragment>
            <div slot="body_alt">
              10.30am - 11.30am
              <div>Lecturer: Mr. Sanmugam</div>
            </div>
          </ListItem>
          <ListItem>
            <svelte:fragment slot="body_title">BDSM 101</svelte:fragment>
            <div slot="body_alt">
              12.00pm - 2.00pm
              <div>Lecturer: Dm Lecturer</div>
            </div>
          </ListItem>
      </WindowItem>
    </Window>
  </svelte:fragment>
</Card>