<script>
  import {
    Avatar,
    ExpansionPanel,
    ExpansionPanels,
    Icon,
  } from 'svelte-materialify/src';
  import Card from '../../../../components/Card/Card.svelte';
  import ListItem from '../../../../Components/ListItem/ListItem.svelte';

  export let user;
  export let activeModules;
  export let inactiveModules;
  export let lecturer_intakes;
</script>

<Card>
  <svelte:fragment slot="card_title">Details</svelte:fragment>
  <svelte:fragment slot="card_body">
    <div class="profile_wrapper">
      <div class="avatar_wrapper">
        <Avatar
          size="120px"
          class="primary-color text-center text-h2 elevation-4"
        >
          {#if user.profile_pic}
            <img
              src={user.profile_pic}
              alt="Avatar"
              style="object-fit: cover; width: 115px; height: 115px"
            />
          {:else}
            {`${user.first_name.charAt(0)}${user.last_name.charAt(0)}`}
          {/if}
        </Avatar>
      </div>
      <h4 class="text-h4 text-center">
        {`${user.first_name} ${user.last_name}`}
      </h4>
      <h6 class="text-subtitle-1 text-center text--secondary">
        {user.role_id === 0
          ? 'Student'
          : user.role_id === 1
          ? 'Lecturer'
          : 'Admin'}
      </h6>
      <h6 class="text-subtitle-1 text-center text--secondary">
        TP{user.user_tp}
        {user.role_id !== 2 ? `| ${user.intake_id || user.module_id}` : ''}
      </h6>
      <h6 class="text-subtitle-1 text-center text--secondary">
        {user.email}
      </h6>
      {#if user.role_id === 0}
        <ExpansionPanels multiple style="border-radius:8px">
          <ExpansionPanel>
            <span slot="header" class="text-subtitle-1 text--secondary"
              >Current modules</span
            >
            {#if activeModules.length > 0}
              <div class="col_items">
                {#each activeModules as active}
                  <ListItem>
                    <svelte:fragment slot="body_title"
                      >{active.module_name} ({active.module_id})</svelte:fragment
                    >
                  </ListItem>
                {/each}
              </div>
            {:else}
              No current modules were found
            {/if}
          </ExpansionPanel>
          <ExpansionPanel>
            <span slot="header" class="text-subtitle-1 text--secondary"
              >Past modules</span
            >
            {#if inactiveModules.length > 0}
              <div class="col_items">
                {#each inactiveModules as inactive}
                  <ListItem>
                    <svelte:fragment slot="body_title"
                      >{inactive.module_name} ({inactive.module_id})</svelte:fragment
                    >
                  </ListItem>
                {/each}
              </div>
            {:else}
              No past modules were found
            {/if}
          </ExpansionPanel>
        </ExpansionPanels>
      {:else if user.role_id === 1}
        <ExpansionPanels style="border-radius:8px">
          <ExpansionPanel>
            <span slot="header" class="text-subtitle-1 text--secondary"
              >Lecturing intakes</span
            >
            {#if lecturer_intakes.length > 0}
              <div class="col_items">
                {#each lecturer_intakes as active}
                  <ListItem>
                    <svelte:fragment slot="body_title"
                      >{active.intake_id}</svelte:fragment
                    >
                  </ListItem>
                {/each}
              </div>
            {:else}
              No lecturing intakes were found
            {/if}
          </ExpansionPanel>
        </ExpansionPanels>
      {/if}
    </div>
  </svelte:fragment>
</Card>

<style>
  .profile_wrapper {
    display: flex;
    align-items: center;
    flex-direction: column;
    row-gap: 15px;
    padding: 16px;
    border-radius: 8px;
    background-color: var(--theme-app-bar);
  }
  .avatar_wrapper {
    align-items: center;
    flex: auto;
    margin: 0 auto;
  }
  .col_items {
    flex: 1;
    display: flex;
    flex-direction: column;
    row-gap: 8px;
  }
</style>
