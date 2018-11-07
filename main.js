!function(t){var e={};function o(n){if(e[n])return e[n].exports;var a=e[n]={i:n,l:!1,exports:{}};return t[n].call(a.exports,a,a.exports,o),a.l=!0,a.exports}o.m=t,o.c=e,o.d=function(t,e,n){o.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},o.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},o.t=function(t,e){if(1&e&&(t=o(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var a in t)o.d(n,a,function(e){return t[e]}.bind(null,a));return n},o.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return o.d(e,"a",e),e},o.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},o.p="",o(o.s=6)}([function(t,e,o){"use strict";var n={get:()=>JSON.parse(localStorage.getItem("app-todos")||"[]"),set:function(t,e,o){let n;return function(...a){const i=this,r=o&&!n;clearTimeout(n),n=setTimeout(function(){n=null,o||t.apply(i,a)},e),r&&t.apply(i,a)}}(t=>localStorage.setItem("app-todos",JSON.stringify(t)),1e3)};e.a=new class{get hash(){const t=(location.hash.match(/\w+/g)||[])[0];return"completed"!==t&&"active"!==t?"all":t}get incompleted(){return this.filter("active")}get completed(){return this.filter("completed")}get filtered(){return this.filter(this.hash)}get allDone(){return this.filtered.every(t=>t.completed)}indexOf(t){return this.todos.findIndex(e=>e.uid===t)}filter(t){return"all"===t&&this.todos||this.todos.filter("active"===t?t=>!t.completed:t=>t.completed)}init(t){this.todos=n.get(),this.update=(()=>{t(this.filtered),n.set(this.todos)}),window.onhashchange=this.update}add(t){const e=(new Date).toJSON().replace(/[^\w]/g,"");this.todos.push({uid:e,text:t,completed:!1}),this.update()}clear(){this.todos=this.todos.filter(t=>!t.completed),this.update()}edit(t,e){this.todos[this.indexOf(t)].text=e,this.update()}remove(t){this.todos.splice(this.indexOf(t),1),this.update()}toggle(t){const e=this.todos[this.indexOf(t)];e.completed=!e.completed,this.update()}toggleAll(){const t=!this.allDone;for(const e of this.todos)e.completed=t;this.update()}}},function(t,e){t.exports=hyperHTML},function(t,e,o){t.exports={todo:"todo-todo",edit:"todo-edit",completed:"todo-completed",destroy:"todo-destroy",editing:"todo-editing",view:"todo-view",toggle:"todo-toggle"}},function(t,e,o){t.exports={container:"footer-container",count:"footer-count",filters:"footer-filters",selected:"footer-selected",clear:"footer-clear"}},function(t,e,o){t.exports={container:"header-container",toggle:"header-toggle",checked:"header-checked",input:"header-input"}},function(t,e,o){t.exports={container:"app-container",content:"app-content",todos:"app-todos",info:"app-info"}},function(t,e,o){"use strict";o.r(e);var n=o(1),a=o(0);const i=Object(n.wire)(),r=Object(n.bind)(document.querySelector("#__wrapper__"));(t=>{a.a.init(e=>r`${t(i,e)}`),a.a.update()})(o(7).default)},function(t,e,o){"use strict";o.r(e);var n=o(1),a=o(0),i=o(4),r=o.n(i);var s=t=>t`
  <header class=${r.a.container}>
    <h1>todos</h1>
    ${a.a.filtered.length?Object(n["wire"])()`
    <input
      id="toggle-all"
      type="checkbox"
      class=${`${r.a.toggle} ${a.a.allDone&&r.a.checked}`}
      checked=${a.a.allDone}
      onchange=${()=>a.a.toggleAll()}
    />
    <label for="toggle-all">Mark all as complete</label>
  `:Object(n["wire"])()`${[]}`}
    <input
      autofocus
      class=${r.a.input}
      placeholder="What needs to be done?"
      onkeypress=${function(t){const e=t.target.value.trim();"Enter"===t.key&&e&&(t.target.value="",a.a.add(e),setTimeout(()=>t.target.focus()))}}
    />
  </header>
`,c=o(3),l=o.n(c);function d(t){const e=t.toLowerCase();return Object(n["wire"])()`
    <li><a href=${`#/${e}`} class=${a.a.hash===e&&l.a.selected}>${t}</a></li>
  `}var u=t=>{if(!a.a.todos.length)return t`${[]}`;const e=a.a.incompleted.length;return t`
    <footer class=${l.a.container}>
      <span class=${l.a.count}>
        <strong>${e}</strong>
        item${~-e?"s":""} left
      </span>
      <ul class=${l.a.filters}>
        ${["All","Active","Completed"].map(d)}
      </ul>
      ${a.a.completed.length?Object(n["wire"])()`
    <button class=${l.a.clear} onclick=${()=>a.a.clear()}>
      Clear completed
    </button>
  `:Object(n["wire"])()`${[]}`}
    </footer>
  `},p=o(2),f=o.n(p);var h=t=>{const{uid:e,text:o,completed:i}=t;return Object(n["wire"])(t)`
    <li data-uid=${e} class=${`${f.a.todo} ${i&&f.a.completed}`}>
      <div class=${f.a.view}>
        <input
          type="checkbox"
          class=${f.a.toggle}
          checked=${i}
          onchange=${function(t){const e=t.target.closest("li");a.a.toggle(e.dataset.uid)}}
        />
        <label ondblclick=${function(t){const e=t.target.closest("li");e.classList.add(f.a.editing),e.querySelector(`.${f.a.edit}`).select()}}>${o}</label>
        <button class=${f.a.destroy} onclick=${function(t){const e=t.target.closest("li");a.a.remove(e.dataset.uid)}} />
      </div>
      <input
        value=${o}
        class=${f.a.edit}
        onblur=${function(t){t.target.closest("li").classList.remove(f.a.editing)}}
        onkeyup=${function(t){const e=t.target.value.trim(),o=t.target.closest("li");"Enter"===t.key&&e?(a.a.edit(o.dataset.uid,e),o.classList.remove(f.a.editing)):"Escape"===t.key&&o.classList.remove(f.a.editing)}}
      />
    </li>
  `},g=o(5),$=o.n(g);const m=Object(n.wire)(),b=Object(n.wire)();e.default=((t,e)=>t`
  <div class=${$.a.container}>
    <section class=${$.a.content}>
      ${s(m)}
      <section class=${$.a.todos}>
        <ul>${e.map(h)}</ul>
      </section>
      ${u(b)}
    </section>
    <footer class=${$.a.info}>
			<p>Double-click to edit a todo</p>
			<p>Written by <a href="https://djalmajr.com">Djalma Jr.</a></p>
			<p>Not (yet 😆) part of <a href="http://todomvc.com">TodoMVC</a></p>
		</footer>
  </div>
`)}]);