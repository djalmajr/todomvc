<script>
  import { createEventDispatcher } from 'svelte';

  export let checked;
  export let showCheck;

  let text;

  const dispatch = createEventDispatcher();

  const handleAdd = (evt) => {
    if (evt.key === 'Enter' && text) {
      dispatch('add', text);
      text = '';
    }
  };
</script>

<style>
  .header__title {
    color: rgba(175, 47, 47, 0.15);
    font-size: 100px;
    font-weight: 100;
    position: absolute;
    text-align: center;
    text-rendering: optimizeLegibility;
    top: -155px;
    user-select: none;
    width: 100%;
  }

  .header__input {
    background: rgba(0, 0, 0, 0.003);
    border: none;
    box-shadow: inset 0 -2px 1px rgba(0, 0, 0, 0.03);
    padding: 16px 16px 16px 60px;
  }

  .header__toggle {
    border: none;
    opacity: 0;
    position: absolute;
    text-align: center;
  }

  .header__toggle + label {
    cursor: pointer;
    font-size: 0;
    height: 34px;
    left: -13px;
    position: absolute;
    top: 13px;
    transform: rotate(90deg);
    width: 60px;
    z-index: 1;
  }

  .header__toggle + label:before {
    color: #e6e6e6;
    content: '❯';
    font-size: 22px;
    padding: 10px 27px;
  }

  .header__toggle--checked + label:before {
    color: #737373;
  }

  /*
    Hack to remove background from Mobile Safari.
    Can't use it globally since it destroys checkboxes in Firefox
  */
  @media screen and (-webkit-min-device-pixel-ratio: 0) {
    .header__toggle {
      background: none;
    }
  }
</style>

<header class="header">
  <h1 class="header__title">todos</h1>
  {#if showCheck}
    <input
      {checked}
      id="toggle-all"
      type="checkbox"
      class="header__toggle"
      class:header__toggle--checked={checked}
      on:change={() => dispatch('toggle')} />
    <label for="toggle-all">Mark all as complete</label>
  {/if}
  <input
    autofocus
    class="header__input"
    placeholder="What needs to be done?"
    bind:value={text}
    on:keydown={handleAdd} />
</header>
