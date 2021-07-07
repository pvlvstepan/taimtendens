<script>
  import { mdiArrowRight } from '@mdi/js'; 
  import Card from '../../../../Components/Card/Card.svelte';
  import { Button, Icon, Col, Row } from 'svelte-materialify';
  import { tabValue } from '../../../../store/store';
  import ListItem from '../../../../Components/ListItem/ListItem.svelte';
</script>

<Card>
  <svelte:fragment slot="card_title">Attendance Summary</svelte:fragment>

  <svelte:fragment slot="card_body">
    <Row>
      <Col>
        <Button block class="primary-color">Sign Class Attendance</Button>
      </Col>
      <Col class="col_items">
        <ListItem>
          <svelte:fragment slot="body_title"
            >MODULE 1</svelte:fragment
          >
          <div class="green-text" slot="body_alt">
            10/12 Classes (83%)
          </div>
        </ListItem>
        <ListItem>
          <svelte:fragment slot="body_title"
            >MODULE 2</svelte:fragment
          >
         <div class="green-text" slot="body_alt">
           9/9 Classes (100%)
         </div>
        </ListItem>
        <ListItem>
          <svelte:fragment slot="body_title"
            >MODULE 3</svelte:fragment
          >
          <div class="red-text" slot="body_alt">
            7/9 Classes (78%)
          </div>
        </ListItem>
        <ListItem>
          <svelte:fragment slot="body_title"
            >MODULE 4</svelte:fragment
            >
         <div class="green-text" slot="body_alt">
            13/14 Classes (93%) 
         </div>
        </ListItem>
      </Col>
    </Row>
  </svelte:fragment>
  <div class="button_wrapper" slot="card_footer">
    <Button text on:click={() => tabValue.set(1)}>
      View Attendance Report
      <Icon path={mdiArrowRight} class="ml-1" />
    </Button>
  </div>
</Card>

<style>

    .col_items {
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