import { createGlobalStyle } from 'styled-components';


export default createGlobalStyle`
  .ProseMirror {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Hiragino Kaku Gothic Pro", "ヒラギノ角ゴシック", "メイリオ", Meiryo, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    padding: 10px;
    background: #fff;
  }

  .ProseMirror:focus {
    outline: none;
  }

  .ProseMirror hr {
    padding: 2px 10px;
    border: none;
    margin: 1em 0;
  }

  .ProseMirror hr:after {
    content: "";
    display: block;
    height: 1px;
    background-color: silver;
    line-height: 2px;
  }

  .ProseMirror ul, .ProseMirror ol {
    padding-left: 30px;
  }

  .ProseMirror blockquote {
    padding-left: 1em;
    border-left: 3px solid #eee;
    margin-left: 0;
    margin-right: 0;
  }

  .ProseMirror img {
    max-width: 100%;
    height: auto;
    cursor: default;
  }

  .ProseMirror th,
  .ProseMirror td {
    border: 1px solid #eee;
    padding: 2px 5px;
  }

  .ProseMirror sup,
  .ProseMirror sub {
    line-height: 0;
  }

  .ProseMirror p {
    padding: 5px;
    transition: background-color .3s;
    border-radius: 2px;
  }

  .ProseMirror li > p {
    margin: 0;
  }

  .ProseMirror .selected {
    background-color: #F2F2F4;
    border-radius: 3px;
  }

  .ProseMirror p.empty-node:first-child::before {
    content: "さぁ書き始めよう！";
  }

  .ProseMirror td,
  .ProseMirror th {
    border-color: #767676;
  }

  .ProseMirror table {
    margin-bottom: 15px;
    border-color: #767676;
  }

  .ProseMirror table p.empty-node:first-child::before {
    display: none;
  }

  .ProseMirror ::selection {
    background-color: #D1DDF0;
    color: #014CC5;
    border-right: 1px solid #014CC5;
    border-left: 1px solid #014CC5;
  }

  .ProseMirror figure {
    pointer-events: none;
  }

  svg {
    width: 32px;
    height: 32px;
  }
`