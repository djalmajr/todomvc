!function(e){var t={};function o(n){if(t[n])return t[n].exports;var a=t[n]={i:n,l:!1,exports:{}};return e[n].call(a.exports,a,a.exports,o),a.l=!0,a.exports}o.m=e,o.c=t,o.d=function(e,t,n){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},o.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)o.d(n,a,function(t){return e[t]}.bind(null,a));return n},o.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="",o(o.s=10)}([function(e,t){e.exports=hyperHTML},function(e,t){e.exports=mobx},function(e,t,o){e.exports={container:"main-container",list:"main-list",edit:"main-edit",completed:"main-completed",destroy:"main-destroy",editing:"main-editing",view:"main-view",toggle:"main-toggle"}},function(e,t){e.exports=classNames},function(e,t,o){e.exports={container:"footer-container",count:"footer-count",filters:"footer-filters",selected:"footer-selected",clear:"footer-clear"}},function(e,t,o){e.exports={container:"header-container",toggle:"header-toggle",checked:"header-checked",input:"header-input"}},function(e,t,o){e.exports={container:"app-container",content:"app-content",info:"app-info"}},function(e,t){e.exports=Router},function(e,t,o){e.exports={input:"input-input"}},function(e,t,o){e.exports={button:"button-button"}},function(e,t,o){"use strict";o.r(t);var n=o(0),a=o.n(n),l=o(1),i=o(7),r=o.n(i);const c=Object(l.observable)({filter:"all",todos:JSON.parse(localStorage.getItem("app-todos")||"{}"),get allDone(){return this.filteredTodos.every(e=>e.completed)},get incompletedTodos(){return Object.values(this.todos).filter(e=>!e.completed)},get activeTodos(){return Object.values(this.todos).filter(e=>e.completed)},get filteredTodos(){const e=Object.values(this.todos);switch(this.filter){case"active":return e.filter(e=>!e.completed);case"completed":return e.filter(e=>e.completed);default:return e}},get remaining(){return this.incompletedTodos.length>1?"items left":"item left"},get showToggle(){return!!this.filteredTodos.length},setFilter:Object(l.action)(function(e){this.filter=e}),addTodo:Object(l.action)(function(e){const t=(new Date).toJSON().replace(".",":");this.todos[t]={id:t,text:e,completed:!1}}),clearCompleted:Object(l.action)(function(){for(let e in this.todos)this.todos[e].completed&&delete this.todos[e]}),removeTodo:Object(l.action)(function(e){delete this.todos[e.id]}),toggleTodo:Object(l.action)(function(e){this.todos[e.id].completed=!e.completed}),toggleAllTodos:Object(l.action)(function(){const e=!this.allDone;for(let t in this.todos)this.todos[t].completed=e}),updateTodo:Object(l.action)(function(e){this.todos[e.id]=e})});const s=function(e,t,o){let n;return function(...a){const l=this,i=o&&!n;clearTimeout(n),n=setTimeout(function(){n=null,o||e.apply(l,a)},t),i&&e.apply(l,a)}}(e=>{localStorage.setItem("app-todos",JSON.stringify(e))},1e3);Object(l.autorun)(()=>s(Object(l.toJS)(c.todos)));var d=c,u=o(3),p=o.n(u),f=o(8),g=o.n(f),m=(e={})=>a.a.wire(e,":input")`
  <input
    autofocus=${!!e.autofocus}
    class=${p()(g.a.input,e.className)}
    placeholder=${e.placeholder}
    value=${e.value}
    onblur=${e.onBlur}
    onkeypress=${e.onKeyPress}
    onkeyup=${e.onKeyUp}
  />
`,h=o(5),$=o.n(h);const b=()=>d.showToggle?a.a.wire()`
    <input
      id="toggle-all"
      type="checkbox"
      class=${p()($.a.toggle,{[$.a.checked]:d.allDone})}
      checked=${d.allDone}
      onchange=${()=>{d.toggleAllTodos()}}
    />
    <label for="toggle-all">Mark all as complete</label>
  `:a.a.wire()`${[]}`,v={autofocus:!0,className:$.a.input,placeholder:"What needs to be done?",onKeyPress:e=>{const t=e.target.value.trim();"Enter"===e.key&&t&&(e.target.value="",d.addTodo(t),setTimeout(()=>e.target.focus()))}};var y=o(9),T=o.n(y),j=(e={})=>a.a.wire(e,":button")`
  <button
    class=${p()(T.a.button,e.className)}
    onclick=${e.onClick}
  >
    ${e.children}
  </button>
`,O=o(2),w=o.n(O);const x=e=>{const t=e.target.closest("li");return d.todos[t.dataset.id]},k=e=>{const t=x(e);e.target.value=t.text,e.target.closest("li").classList.remove(w.a.editing)},S=e=>{const t=e.target.value.trim(),o=e.target.closest("li"),n=x(e);"Enter"===e.key&&t?(d.updateTodo({...n,text:t}),o.classList.remove(w.a.editing)):"Escape"===e.key&&(e.target.value=n.text,o.classList.remove(w.a.editing))},N=e=>{d.removeTodo(x(e))},_=e=>{const{id:t,text:o,completed:n}=e;return a.a.wire(e)`
    <li data-id=${t} class=${p()({[w.a.completed]:n})}>
      <div class=${w.a.view}>
        <input
          type="checkbox"
          class=${w.a.toggle}
          checked=${n}
          onchange=${e=>{d.toggleTodo(x(e))}}
        />
        <label ondblclick=${e=>{const t=e.target.closest("li");t.classList.add(w.a.editing),t.querySelector(`.${w.a.edit}`).select()}}>${o}</label>
        ${j({className:w.a.destroy,onClick:N})}
      </div>
      ${m({className:w.a.edit,value:o,onBlur:k,onKeyUp:S})}
    </li>
  `};var C=o(4),D=o.n(C);const M=e=>{const t=e.toLowerCase();return a.a.wire()`
    <li>
      <a href=${`#/${t}`} class=${p()({[D.a.selected]:d.filter===t})}>
        ${e}
      </a>
    </li>
  `};var P=()=>Object.values(d.todos).length?a.a.wire()`
    <footer class=${D.a.container}>
      <span class=${D.a.count}>
        <strong>${d.incompletedTodos.length}</strong> ${d.remaining}
      </span>
      <ul class=${D.a.filters}>
        ${["All","Active","Completed"].map(M)}
      </ul>
      ${d.activeTodos.length?j({className:D.a.clear,children:"Clear completed",onClick(e){e.preventDefault(),d.clearCompleted()}}):a.a.wire()`${[]}`}
    </footer>
  `:a.a.wire()`${[]}`,L=o(6),J=o.n(L);const A=new r.a;["all","active","completed"].forEach(e=>A.on(e,()=>d.setFilter(e))),A.configure({notfound:()=>A.setRoute(filter)}),A.init("#/all");(e=>{Object(l.autorun)(()=>{const t=document.querySelector("#__wrapper__");a.a.bind(t)`${e}`})})(()=>a.a.wire()`
  <div class=${J.a.container}>
    <section class=${J.a.content}>
      ${a.a.wire()`
  <header class=${$.a.container}>
    <h1>todos</h1>
    ${b()}
    ${m(v)}
  </header>
`}
      ${a.a.wire()`
  <section class=${w.a.container}>
    <ul class=${w.a.list}>
      ${d.filteredTodos.map(_)}
    </ul>
  </section>
`}
      ${P()}
    </section>
    <footer class=${J.a.info}>
			<p>Double-click to edit a todo</p>
			<p>Written by <a href="https://djalmajr.com">Djalma Jr.</a></p>
			<p>Not (yet 😆) part of <a href="http://todomvc.com">TodoMVC</a></p>
		</footer>
  </div>
`)}]);