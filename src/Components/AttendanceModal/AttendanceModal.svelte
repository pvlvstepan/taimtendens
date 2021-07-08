<script>
  import { mdiClose } from '@mdi/js';
  import {
    Button,
    Col,
    Dialog,
    Icon,
    Row,
    TextField,
  } from 'svelte-materialify';
  import Card from '../Card/Card.svelte';
  import {signAttendanceIsOpen} from '../../store/store.js'

  let active;
  let isValid = false
  let values = []

  signAttendanceIsOpen.subscribe((value) => {
    active = value;
    if (active === false)
      values = []
      isValid = false
  });

  const handleKeyPress = (e) => {
    const id = e.target.id
    if (e.keyCode === 8 || e.keyCode >= 48 && e.keyCode <= 57) {
      if (e.keyCode === 8 ) {
        values[parseInt(id)] = null
      } else {
        values[parseInt(id)] = parseInt(e.key)
      }
    }
    isValid = !values.includes(null) && values.length === 3
    console.log(values)
    e.preventDefault()
  }
</script>

<Dialog persistent bind:active>
  <div class="dialog_content">
    <Button
      class="btn_close"
      on:click={() => signAttendanceIsOpen.set(false)}
      icon
      style="position: absolute; top: 8px; right: 8px;"
      ><Icon path={mdiClose} /></Button
    >
    <Card>
      <svelte:fragment slot="card_title">Sign Attendance</svelte:fragment>
      <div slot="card_body" class="inputs_wrapper">
        <div class="input_wrapper">
          <input 
          class="text-h4 text-center primary-text"
          id='0'
          value={values[0] ? values[0] : null}
          maxlength='1'
          min="1" 
          step="1"
          on:keydown={handleKeyPress}/>
        </div>
        <div class="input_wrapper">
          <input 
          class="text-h4 text-center primary-text"
          id='1'
          value={values[1] ? values[1] : null}
          maxlength='1'
          min="1" 
          step="1"
          on:keydown={handleKeyPress}/>
        </div>
        <div class="input_wrapper">
          <input 
          class="text-h4 text-center primary-text"
          id='2'
          value={values[2] ? values[2] : null}
          maxlength='1'
          min="1" 
          step="1"
          on:keydown={handleKeyPress}/>
        </div>
      </div>
      <div slot="card_footer" class="button_wrapper">
        <Button on:click={() => signAttendanceIsOpen.set(false)} text>Cancel</Button>
        <Button on:click={() => alert('okay')}
          class={!isValid ? 'not-valid' : 'valid primary-color'}
          disabled={!isValid}>
          Sign Attendance</Button>
      </div>
    </Card>
  </div>
</Dialog>

<style>
  .dialog_content {
    position: relative;
  }
  .button_wrapper {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    column-gap: 8px;
  }
  .inputs_wrapper {
    padding: 30px 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    column-gap: 15px;
  }
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  .input_wrapper {
    max-width: 56px;
    max-height: 56px;
  }
  .input_wrapper input {
    max-width: 100%;
    width: 56px;
    height: 56px;
    border-radius: 8px;
    border: 1px solid var(--theme-text-fields-outlined);
    transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
  }
  .input_wrapper input:hover {
    border: 1px solid var(--theme-text-primary);
  }
  .input_wrapper input:active {
    outline: none;
    border: 2px solid #6200ee;
  }
  .input_wrapper input:focus {
    outline: none;
    border: 2px solid #6200ee;
  }
</style>
