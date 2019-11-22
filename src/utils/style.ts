import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
   html {
    font-size: 16px;
   }
   
  .ProseMirror {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Hiragino Kaku Gothic Pro", "ヒラギノ角ゴシック", "メイリオ", Meiryo, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    padding: 10px 5px;
    background: #fff;
  }

  .ProseMirror:focus {
    outline: none;
  }
  
  @media screen and (min-width: 768px){
      .ProseMirror {
        padding: 10px;
      }
  }
  
  .ProseMirror a {
    color: #014CC5;
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
  
  .ProseMirror *:first-child {
    margin-top: 0;
  }
  
  .ProseMirror p {
    margin: 0 0 30px 0;
    padding: 5px;
    line-height: 1.6;
    font-size: 1rem;
    border-radius: 3px;
    transition: background-color .3s;
    box-sizing: border-box;
  }
  
  @media screen and (min-width: 768px){
      .ProseMirror p {
        padding: 5px 10px;
      }
  }
  
  .ProseMirror h1 {
    margin: 0 0 30px 0;
    padding: 0 5px;
    font-size: 1.875rem;
    line-height: 1.3;
  }
  
  @media screen and (min-width: 768px){
      .ProseMirror h1 {
        padding: 0 10px;
        font-size: 2.125rem;
      }
  }
  
  
  .ProseMirror h2,
  .ProseMirror h3 {
    margin: 20px 0 10px 0;
    padding: 5px;
    line-height: 1.4;
    border-radius: 3px;
    transition: background-color .3s;
    box-sizing: border-box;
  }

  .ProseMirror h2 {
    font-size: 1.625rem;
  }
  
  .ProseMirror h3 {
    font-size: 1.375rem;
  }
  
  @media screen and (min-width: 768px){
      .ProseMirror h2,
      .ProseMirror h3 {
        padding: 5px 10px;
      }
  }


  .ProseMirror ul, .ProseMirror ol {
    margin: 0 0 30px 0;
    padding: 5px 5px 5px 30px;
    font-size: 1rem;
    line-height: 1.4;
    box-sizing: border-box;
  }
  
  .ProseMirror li > p {
    margin: 0;
    padding: 0;
    min-height: auto;
  }
  
  .ProseMirror li ul, .ProseMirror li ol {
    margin: 0;
  }

  .ProseMirror blockquote {
    position: relative;
    margin: 0 0 30px 0;
    padding: 10px 5px 10px 25px;
    font-size: .875rem;
    line-height: 1.5;
    box-sizing: border-box;
  }
  
  .ProseMirror blockquote:before {
    content: "";
    position: absolute;
    top: 5px;
    bottom: 5px;
    left: 10px;
    border-left: 5px solid #D3D3D3;
  }
  
  @media screen and (min-width: 768px){
      .ProseMirror blockquote {
        padding: 10px 10px 10px 30px;
      }
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

  .ProseMirror a {
    
  }

  .ProseMirror .selected {
    background-color: #F2F2F4;
    border-radius: 3px;
  }

  .ProseMirrorHideSelection .selected {
    background-color: transparent;
  }

  .ProseMirror .ProseMirror-widget {
    color: #ADADAD;
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
    color: #014CC5;
    background: #D1DDF0;
    border-right: 1px solid #014CC5;
    border-left: 1px solid #014CC5;
    caret-color: red;
  }

  .ProseMirror figure {
    pointer-events: none;
    color: transparent;
  }

  .ProseMirror .caption {
    color: #909090;
    display: block;
    text-align: center;
  }
  .ProseMirror .caption:empty::before {
    content: "ここにキャプションを入力"
  }

  .ProseMirror .media {
    padding: 10px;
    margin: 0;
    display: block;
  }

  .ProseMirror .media.selected {
    position: relative;
    background-color: #F2F2F4;
  }

  .ProseMirror .media img.small {
    width: 320px;
    height: auto;
    display: block;
    margin: 0 auto;
  }

  .ProseMirror .media img {
    max-width: 100%;
    height: auto;
    cursor: default;
  }

  .ProseMirror .media .caption {
    color: #333;
    margin-top: 0;
    margin-bottom: 5px;
  }
  .ProseMirror .media .caption:empty::before {
    content: "ここにキャプションを入力"
    display: inline-block;
  }
  .ProseMirror .youtube-frame-wrap {
    margin-bottom: 30px;
    padding: 10px 40px;
  }
  .ProseMirror .embed-wrap {
    margin: 0 5px 30px 5px;
    position: relative;
    z-index: 10;
    padding: 5px;
  }
  .ProseMirror .embed {
    position: relative;
    display: block;
    padding: 20px;
    color: #666;
    font-size: 14px;
    background: #FFF;
    border: 1px solid rgba(201, 201, 204, 0.48);
    box-shadow: 0 1px 3px rgba(0,0,0, .1);
    
    &:link,
    &:hover,
    &:visited {
      color: #666;
      text-decoration: none;
    }
  }
  .ProseMirror .youtube-frame {
    position: relative;
    width: 100%;
    height: 0;
    padding-bottom: 56.25%;
    iframe {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border: none;
    }
  }

  .ProseMirror pre,
  .ProseMirror pre.selected {
    background-color: #333;
    padding: 10px;
    border-radius: 5px;
    color: #FFF;
  }
`
