<script>
  import { keys } from '../helpers/object';
  import { filterTodos, hash, todoCache, todos } from '../store';
  import Footer from './Footer.svelte';
  import Header from './Header.svelte';
  import Todo from './Todo.svelte';

  $: filtered = filterTodos($hash, $todos);
  $: completed = filterTodos('completed', $todos);
  $: incompleted = filterTodos('active', $todos);
  $: allDone = filtered.every((t) => t.completed);
  $: hasVisibleTodos = !!filtered.length;
  $: todoCache.set($todos);
</script>

<style>
  .app__container {
    color: #4d4d4d;
    margin: 0 auto;
    max-width: 550px;
    min-width: 230px;
  }

  .app__content {
    background: #fff;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 25px 50px 0 rgba(0, 0, 0, 0.1);
    margin: 130px 0 40px;
    position: relative;
  }

  .app__info {
    margin: 65px auto 0;
    color: #bfbfbf;
    font-size: 12px;
    text-shadow: 0 1px 0 rgba(255, 255, 255, 0.5);
    text-align: center;
  }

  .app__info p {
    line-height: 1;
  }

  .app__info a {
    color: inherit;
    text-decoration: none;
    font-weight: 400;
  }

  .app__info a:hover {
    text-decoration: underline;
  }

  .app__todos {
    border-top: 1px solid #e6e6e6;
    position: relative;
    z-index: 2;
  }

  .app__todos ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
</style>

<div class="app__container">
  <section class="app__content">
    <Header
      checked={allDone}
      showCheck={hasVisibleTodos}
      on:add={(e) => todos.add(e.detail)}
      on:toggle={todos.toggleAll} />
    <section class="app__todos">
      <ul>
        {#each filtered as todo (todo.uid)}
          <Todo
            {todo}
            on:edit={(e) => todos.edit(e.detail)}
            on:remove={(e) => todos.remove(e.detail)}
            on:toggle={(e) => todos.toggle(e.detail)} />
        {/each}
      </ul>
    </section>
    {#if keys($todos).length}
      <Footer
        hash={$hash}
        empty={!completed.length}
        remaining={incompleted.length}
        on:clear={todos.clear} />
    {/if}
  </section>
  <footer class="app__info">
    <p>Double-click to edit a todo</p>
    <p>
      Written by
      <a href="https://djalmajr.com">Djalma Jr</a>
    </p>
    <p>
      Not (yet 😆) part of
      <a href="http://todomvc.com">TodoMVC!!!</a>
    </p>
  </footer>
</div>
