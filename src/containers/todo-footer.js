import { component, html } from 'haunted';
import { css } from 'lit-element/lib/css-tag';
import { emit } from '../helpers/dom.js';
import { useStyles } from '../hooks/useStyles.js';
import buttonStyle from '../styles/button.css.js';

const style = css`
  :host {
    font: 14px 'Helvetica Neue', Helvetica, Arial, sans-serif;
    font-weight: 300;
    line-height: 1.4em;
  }

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

  .clear,
  .clear:active {
    cursor: pointer;
    float: right;
    line-height: 20px;
    position: relative;
    text-decoration: none;
  }

  .clear:hover {
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
`;

const cn = (hash, curr) => (hash === curr ? 'selected' : '');

export function TodoFooter({ empty, remaining, slug, visible }) {
  useStyles(this, [buttonStyle, style]);

  const renderClear = () => {
    if (empty) return '';

    return html`
      <button class="clear" @click=${() => emit(this, 'clear')}>
        Clear completed
      </button>
    `;
  };

  if (!visible) return '';

  return html`
    <footer class="footer__container">
      <span class="footer__count">
        <strong>${remaining}</strong> item${~-remaining ? 's' : ''} left
      </span>
      <ul class="footer__filters">
        <li>
          <a class=${cn(slug, '/')} href="#/">
            All
          </a>
        </li>
        <li>
          <a class=${cn(slug, '/active')} href="#/active">
            Active
          </a>
        </li>
        <li>
          <a class=${cn(slug, '/completed')} href="#/completed">
            Completed
          </a>
        </li>
      </ul>
      ${renderClear()}
    </footer>
  `;
}

TodoFooter.observedAttributes = ['slug'];

if (!customElements.get('todo-footer')) {
  customElements.define('todo-footer', component(TodoFooter));
}
