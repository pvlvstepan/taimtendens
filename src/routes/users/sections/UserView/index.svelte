<script>
  import { Avatar, Button, Icon, TextField } from 'svelte-materialify/src';

  import Card from '../../../../components/Card/Card.svelte';
  import ListItem from '../../../../components/ListItem/ListItem.svelte';
  import Tabs from '../../../../components/Tabs/Tabs.svelte';

  export let users;

  console.log(users);

  let sortedUsers = users;
  let SearchTerm = '';

  const filterUsers = term => {
    SearchTerm = term;
    sortedUsers = users.filter((value, index) => {
      if (currentTab === 3) {
        return (
          (value.first_name + ' ' + value.last_name)
            .toLowerCase()
            .includes(SearchTerm.toLowerCase()) ||
          (value.intake_id ? value.intake_id : '')
            .toLowerCase()
            .includes(SearchTerm.toLowerCase()) ||
          (value.module_id ? value.module_id : '')
            .toLowerCase()
            .includes(SearchTerm.toLowerCase()) ||
          ('TP' + value.user_tp)
            .toLowerCase()
            .includes(SearchTerm.toLowerCase())
        );
      } else {
        return (
          ((value.first_name + ' ' + value.last_name)
            .toLowerCase()
            .includes(SearchTerm.toLowerCase()) ||
            (value.intake_id ? value.intake_id : '')
              .toLowerCase()
              .includes(SearchTerm.toLowerCase()) ||
            (value.module_id ? value.module_id : '')
              .toLowerCase()
              .includes(SearchTerm.toLowerCase()) ||
            ('TP' + value.user_tp)
              .toLowerCase()
              .includes(SearchTerm.toLowerCase())) &&
          value.role_id === currentTab
        );
      }
    });
  };

  $: currentTab, filterUsers(SearchTerm);

  const tabs = [
    {
      id: 3,
      label: 'All',
    },
    {
      id: 0,
      label: 'Students',
    },
    {
      id: 1,
      label: 'Lecturers',
    },
    {
      id: 2,
      label: 'Admins',
    },
  ];

  let currentTab = 3;

  const changeTab = e => {
    currentTab = e.detail.id;
  };
</script>

<Card>
  <svelte:fragment slot="card_title">
    <div class="row_items justify-space-between">
      Users
      <Button class="primary-color">Add user</Button>
    </div>
  </svelte:fragment>
  <svelte:fragment slot="card_body">
    <Tabs {tabs} {currentTab} on:change={changeTab} full />
    <TextField
      outlined
      dense
      class="mb-4"
      on:input={e => filterUsers(e.target.value)}
    >
      <span slot="prepend">
        <Icon class="mdi mdi-account-search" />
      </span>
      Search by TP number, name, intake or module</TextField
    >
    <div class="col_items">
      {#if sortedUsers.length > 0}
        {#each sortedUsers as user}
          <ListItem>
            <svelte:fragment slot="left_element">
              <Avatar
                size="60px"
                class="primary-color text-center text-h5 elevation-4"
              >
                {#if user.profile_pic && user.profile_pic !== ''}
                  <img
                    src={'data:image/png;base64,' + user.profile_pic}
                    alt="Avatar"
                    style="object-fit: cover; width: 56px; height: 56px"
                  />
                {:else}
                  {`${user.first_name.charAt(0)}${user.last_name.charAt(0)}`}
                {/if}
              </Avatar>
            </svelte:fragment>
            <svelte:fragment slot="body_title"
              >{user.first_name}
              {user.last_name}</svelte:fragment
            >
            <div class="green-text row_items" slot="body_content">
              TP{user.user_tp}
            </div>
            <div class="row_items" slot="body_alt">
              {#if user.role_id !== 2}
                <Icon class="mdi mdi-school" size="16px" />
                {user.module_id || user.intake_id}
              {/if}
            </div>
            <svelte:fragment slot="right_element">
              <Button text icon class="edit_button">
                <Icon class="mdi mdi-account-edit" />
              </Button>
            </svelte:fragment>
          </ListItem>
        {/each}
      {:else}
        <div class="no-classes">
          <h6>No users found</h6>
        </div>
      {/if}
    </div>
  </svelte:fragment>
</Card>

<style>
  .row_items {
    display: flex;
    flex-direction: row;
    column-gap: 8px;
    align-items: center;
  }
  .no-classes {
    height: 150px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .no-classes h6 {
    margin: auto 0;
  }
  .col_items {
    flex: 1;
    display: flex;
    flex-direction: column;
    row-gap: 8px;
  }
  .button_wrapper {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
</style>
