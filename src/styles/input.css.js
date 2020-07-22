import { css } from 'lit-element/lib/css-tag';

export default css`
  input {
    border: 1px solid #999;
    box-shadow: inset 0 -1px 5px 0 rgba(0, 0, 0, 0.2);
    box-sizing: border-box;
    color: inherit;
    font-family: inherit;
    font-size: 24px;
    font-weight: inherit;
    line-height: 1.4em;
    margin: 0;
    padding: 6px;
    position: relative;
    width: 100%;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  input:focus {
    outline: none;
  }

  input::-webkit-input-placeholder {
    color: #e6e6e6;
    font-style: italic;
    font-weight: 300;
  }

  input::-moz-placeholder {
    color: #e6e6e6;
    font-style: italic;
    font-weight: 300;
  }

  input::input-placeholder {
    color: #e6e6e6;
    font-style: italic;
    font-weight: 300;
  }
`;
