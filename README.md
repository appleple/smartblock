# SmartBlock

SmartBlock.js is a JavaScript which enables you to write contents easily on websites even with **SmartPhone**.

## Features

*   Easy to use with SmartPhone
*   Fully customizable
*   Block based
*   Keep clean HTML and wipe out unnecessary tags
*   Get the result as **HTML** or **JSON**
*   copy and paste contents

## Install

    $ npm install smart-block --save

## Usage

```js
import * as React from 'react';
import { render } from 'react-dom';
import { SmartBlock, GlobalStyle } from 'smart-block';

render(<>
  <GlobalStyle />
  <SmartBlock 
    html={'<h2>Hello World</h2><p>hello</p>'}
    onChange={({ json, html }) => { console.log(json, html);}}  
  />
</>, document.getElementById("app"));
```

## Extensions



## Customize

You can add custom block like this

```js
import { Extensions, CustomBlock, CustomMark } from 'smart-block';
Extensions.push(new CustomBlock({  tagName: 'div',  className: '.alert',  icon: <SomeIconComponent />});

render(<>
  <GlobalStyle />
  <SmartBlock 
    extensions={Extensions}
    html={'<h2>Hello World</h2><p>hello</p>'}
    onChange={({ json, html }) => { console.log(json, html);}}  
  />
</>, document.getElementById("app"));
```

You can also add custom inline element like this

```js
import { Extension, CustomBlock, CustomMark } from 'smart-block';
Extension.push(new CustomMark({  tagName: 'span',  className: '.small',  icon: <SomeIconComponent />});

render(<>
  <GlobalStyle />
  <SmartBlock 
    extensions={Extensions}
    html={'<h2>Hello World</h2><p>hello</p>'}
    onChange={({ json, html }) => { console.log(json, html);}}  
  />
</>, document.getElementById("app"));
```

## Options

| Props        | description                                                                                                 | type               | default                                                                                                                                                                                                                                                                                                                                                                 |
| ------------ | ----------------------------------------------------------------------------------------------------------- | ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| extensions   | Array of extensions which extend the feature of SmartBlock                                                  | Extension[] | array of extensions |
| onChange     | Callback function which is called when the content of the editor is changed. You can get both html and json | Function           |                                                                                                                                                                                                                                                                                                                                                                         |
| onInit       | Callback function which is called when the editor is initialized                                            | Function           |                                                                                                                                                                                                                                                                                                                                                                         |
| json         | The editor contents will be initialized with the json data                                                  | Object             | {}                                                                                                                                                                                                                                                                                                                                                                      |
| HTML         | The editor contents will be initialized with the HTML                                                       | String             | ''                                                                                                                                                                                                                                                                                                                                                                      |
| showTitle    | Title will be shown                                                                                         | Boolean            | false                                                                                                                                                                                                                                                                                                                                                                   |
| showBackBtn  | Btn to support history back will be shown                                                                   | Boolean            | false                                                                                                                                                                                                                                                                                                                                                                   |
| autoSave     | The HTML will be stored to the localstorage every time the content is changed                               | Boolean            | false                                                                                                                                                                                                                                                                                                                                                                   |
| getEditorRef | Get the editor ref object                                                                                   | Function           |                                                                                                                                                                                                                                                                                                                                                                         |
