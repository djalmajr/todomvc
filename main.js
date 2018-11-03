!function(e){var t={};function o(n){if(t[n])return t[n].exports;var a=t[n]={i:n,l:!1,exports:{}};return e[n].call(a.exports,a,a.exports,o),a.l=!0,a.exports}o.m=e,o.c=t,o.d=function(e,t,n){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},o.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)o.d(n,a,function(t){return e[t]}.bind(null,a));return n},o.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="",o(o.s=11)}([function(e,t){e.exports=hyperHTML},function(e,t){e.exports=mobx},function(e,t,o){e.exports={container:"main-container",list:"main-list",edit:"main-edit",completed:"main-completed",destroy:"main-destroy",editing:"main-editing",view:"main-view",toggle:"main-toggle"}},function(e,t){e.exports=classNames},function(e,t,o){e.exports={container:"footer-container",count:"footer-count",filters:"footer-filters",selected:"footer-selected",clear:"footer-clear"}},function(e,t,o){e.exports={container:"header-container",toggle:"header-toggle",checked:"header-checked",input:"header-input"}},function(e,t,o){e.exports={container:"app-container",content:"app-content",info:"app-info"}},function(e,t){e.exports=Router},function(e,t){e.exports=_},function(e,t,o){e.exports={input:"input-input"}},function(e,t,o){e.exports={button:"button-button"}},function(e,t,o){"use strict";o.r(t);var n=o(0),a=o.n(n),l=o(1),r=o(7),i=o.n(r),c=o(8);const s=Object(l.observable)({filter:"all",todos:JSON.parse(localStorage.getItem("audora-app-todos")||"{}"),get allDone(){return this.filteredTodos.every(e=>e.completed)},get incompletedTodos(){return Object.values(this.todos).filter(e=>!e.completed)},get activeTodos(){return Object.values(this.todos).filter(e=>e.completed)},get filteredTodos(){const e=Object.values(this.todos);switch(this.filter){case"active":return e.filter(e=>!e.completed);case"completed":return e.filter(e=>e.completed);default:return e}},get remaining(){return this.incompletedTodos.length>1?"items left":"item left"},get showToggle(){return!!this.filteredTodos.length},setFilter:Object(l.action)(function(e){this.filter=e}),addTodo:Object(l.action)(function(e){const t=(new Date).toJSON().replace(".",":");this.todos[t]={id:t,text:e,completed:!1}}),clearCompleted:Object(l.action)(function(){for(let e in this.todos)this.todos[e].completed&&delete this.todos[e]}),removeTodo:Object(l.action)(function(e){delete this.todos[e.id]}),toggleTodo:Object(l.action)(function(e){this.todos[e.id].completed=!e.completed}),toggleAllTodos:Object(l.action)(function(){const e=!this.allDone;for(let t in this.todos)this.todos[t].completed=e}),updateTodo:Object(l.action)(function(e){this.todos[e.id]=e})}),d=Object(c.debounce)(e=>{localStorage.setItem("audora-app-todos",JSON.stringify(e))},1e3);Object(l.autorun)(()=>d(Object(l.toJS)(s.todos)));var u=s,p=o(3),f=o.n(p),g=o(9),m=o.n(g),h=(e={})=>a.a.wire(e,":input")`
  <input
    autofocus=${!!e.autofocus}
    class=${f()(m.a.input,e.className)}
    placeholder=${e.placeholder}
    value=${e.value}
    onblur=${e.onBlur}
    onkeypress=${e.onKeyPress}
    onkeyup=${e.onKeyUp}
  />
`,b=o(5),$=o.n(b);const v=()=>u.showToggle?a.a.wire()`
    <input
      id="toggle-all"
      type="checkbox"
      class=${f()($.a.toggle,{[$.a.checked]:u.allDone})}
      checked=${u.allDone}
      onchange=${()=>{u.toggleAllTodos()}}
    />
    <label for="toggle-all">Mark all as complete</label>
  `:a.a.wire()`${[]}`,y={autofocus:!0,className:$.a.input,placeholder:"What needs to be done?",onKeyPress:e=>{const t=e.target.value.trim();"Enter"===e.key&&t&&(e.target.value="",u.addTodo(t),setTimeout(()=>e.target.focus()))}};var j=o(10),O=o.n(j),T=(e={})=>a.a.wire(e,":button")`
  <button
    class=${f()(O.a.button,e.className)}
    onclick=${e.onClick}
  >
    ${e.children}
  </button>
`,x=o(2),w=o.n(x);const k=e=>{const t=e.target.closest("li");return u.todos[t.dataset.id]},S=e=>{const t=k(e);e.target.value=t.text,e.target.closest("li").classList.remove(w.a.editing)},N=e=>{const t=e.target.value.trim(),o=e.target.closest("li"),n=k(e);"Enter"===e.key&&t?(u.updateTodo({...n,text:t}),o.classList.remove(w.a.editing)):"Escape"===e.key&&(e.target.value=n.text,o.classList.remove(w.a.editing))},_=e=>{u.removeTodo(k(e))},C=e=>{const{id:t,text:o,completed:n}=e;return a.a.wire(e)`
    <li data-id=${t} class=${f()({[w.a.completed]:n})}>
      <div class=${w.a.view}>
        <input
          type="checkbox"
          class=${w.a.toggle}
          checked=${n}
          onchange=${e=>{u.toggleTodo(k(e))}}
        />
        <label ondblclick=${e=>{const t=e.target.closest("li");t.classList.add(w.a.editing),t.querySelector(`.${w.a.edit}`).select()}}>${o}</label>
        ${T({className:w.a.destroy,onClick:_})}
      </div>
      ${h({className:w.a.edit,value:o,onBlur:S,onKeyUp:N})}
    </li>
  `};var D=o(4),M=o.n(D);const P=e=>{const t=e.toLowerCase();return a.a.wire()`
    <li>
      <a href=${`#/${t}`} class=${f()({[M.a.selected]:u.filter===t})}>
        ${e}
      </a>
    </li>
  `};var L=()=>Object.values(u.todos).length?a.a.wire()`
    <footer class=${M.a.container}>
      <span class=${M.a.count}>
        <strong>${u.incompletedTodos.length}</strong> ${u.remaining}
      </span>
      <ul class=${M.a.filters}>
        ${["All","Active","Completed"].map(P)}
      </ul>
      ${u.activeTodos.length?T({className:M.a.clear,children:"Clear completed",onClick(e){e.preventDefault(),u.clearCompleted()}}):a.a.wire()`${[]}`}
    </footer>
  `:a.a.wire()`${[]}`,J=o(6),A=o.n(J);const E=new i.a;["all","active","completed"].forEach(e=>E.on(e,()=>u.setFilter(e))),E.configure({notfound:()=>E.setRoute(filter)}),E.init("#/all");(e=>{Object(l.autorun)(()=>{const t=document.querySelector("#__wrapper__");a.a.bind(t)`${e}`})})(()=>a.a.wire()`
  <div class=${A.a.container}>
    <section class=${A.a.content}>
      ${a.a.wire()`
  <header class=${$.a.container}>
    <h1>todos</h1>
    ${v()}
    ${h(y)}
  </header>
`}
      ${a.a.wire()`
  <section class=${w.a.container}>
    <ul class=${w.a.list}>
      ${u.filteredTodos.map(C)}
    </ul>
  </section>
`}
      ${L()}
    </section>
    <footer class=${A.a.info}>
			<p>Double-click to edit a todo</p>
			<p>Written by <a href="https://djalmajr.com">Djalma Jr.</a></p>
			<p>Not (yet 😆) part of <a href="http://todomvc.com">TodoMVC</a></p>
		</footer>
  </div>
`)}]);