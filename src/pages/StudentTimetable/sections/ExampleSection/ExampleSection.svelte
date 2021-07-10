<script>
  import Card from "../../../../Components/Card/Card.svelte";
  import ListItem from "../../../../Components/ListItem/ListItem.svelte";
  import { Tabs, Tab, Window, WindowItem, AppBar } from "svelte-materialify";

  let value = 0;
</script>

<Card>
  <svelte:fragment slot="card_title">Timetable</svelte:fragment>
  <svelte:fragment slot="card_body">You can put components here</svelte:fragment
  >
  <svelte:fragment slot="card_footer">Action Buttons go here...</svelte:fragment
  >
</Card>

<AppBar>
  <span slot="title" class="text-align:center" />
  <div slot="extension">
    <Tabs class="purple-text" bind:value fixedTabs>
      <div slot="tabs">
        <Tab>Monday</Tab>
        <Tab>Tuesday</Tab>
        <Tab>Wednesday</Tab>
        <Tab>Thursday</Tab>
        <Tab>Friday</Tab>
      </div>
    </Tabs>
  </div>
</AppBar><Window {value} class="ma-4">
  <WindowItem class="Monday">
    <Card>
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
    </Card>
  </WindowItem>

  <WindowItem class="Tuesday">
    <Card>
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
    </Card>
  </WindowItem>

  <WindowItem class="Wednesday">
    <Card>
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
    </Card>
  </WindowItem>

  <WindowItem class="Thursday">
    <Card>
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
    </Card>
  </WindowItem>

  <WindowItem class="Friday">
    <Card>
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
    </Card>
  </WindowItem>
</Window>
