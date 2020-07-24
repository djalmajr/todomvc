<script>
  import { createEventDispatcher } from 'svelte';

  export let hash;
  export let empty = true;
  export let remaining = 0;

  const dispatch = createEventDispatcher();
</script>

<style>
  .footer__container {
    border-top: 1px solid #e6e6e6;
    color: #777;
    height: 20px;
    padding: 10px 15px;
    text-align: center;
  }

  .footer__container:before {
    bottom: 0;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2), 0 8px 0 -3px #f6f6f6,
      0 9px 1px -3px rgba(0, 0, 0, 0.2), 0 16px 0 -6px #f6f6f6,
      0 17px 2px -6px rgba(0, 0, 0, 0.2);
    content: '';
    height: 50px;
    left: 0;
    overflow: hidden;
    position: absolute;
    right: 0;
  }

  .footer__count {
    float: left;
    text-align: left;
  }

  .footer__count strong {
    font-weight: 300;
  }

  .footer__filters {
    left: 0;
    list-style: none;
    margin: 0;
    padding: 0;
    position: absolute;
    right: 0;
  }

  .footer__filters li {
    display: inline;
  }

  .footer__filters li a {
    border-radius: 3px;
    border: 1px solid transparent;
    color: inherit;
    margin: 3px;
    padding: 3px 7px;
    text-decoration: none;
  }

  .footer__filters li a:hover {
    border-color: rgba(175, 47, 47, 0.1);
  }

  .footer__filters li a.selected {
    border-color: rgba(175, 47, 47, 0.2);
  }

  .footer__clear,
  .footer__clear:active {
    cursor: pointer;
    float: right;
    line-height: 20px;
    position: relative;
    text-decoration: none;
  }

  .footer__clear:hover {
    text-decoration: underline;
  }

  @media (max-width: 430px) {
    .footer__container {
      height: 50px;
    }

    .footer__filters {
      bottom: 10px;
    }
  }
</style>

<footer class="footer__container">
  <span class="footer__count">
    <strong>{remaining}</strong>
    item{~-remaining ? 's' : ''} left
  </span>
  <ul class="footer__filters">
    <li>
      <a class:selected={hash === 'all'} href="#/all">All</a>
    </li>
    <li>
      <a class:selected={hash === 'active'} href="#/active">Active</a>
    </li>
    <li>
      <a class:selected={hash === 'completed'} href="#/completed">Completed</a>
    </li>
  </ul>
  {#if !empty}
    <button class="footer__clear" on:click={() => dispatch('clear')}>
      Clear completed
    </button>
  {/if}
</footer>
