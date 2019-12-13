# SmartBlock

SmartBlock.js is a JavaScript which enables you to write contents easily on websites even with <span style="font-weight:bold">SmartPhone</span>.

## Features

*   Easy to use with SmartPhone
*   Fully customizable
*   Block based
*   Keep clean HTML and wipe out unnecessary tags
*   Get the result as <span style="font-weight:bold">HTML</span> or <span style="font-weight:bold">JSON</span>
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

<table id="1b6f7eba-73fd-4af6-9dce-6e3b5854e32d">

<tbody>

<tr>

<th>

Props

</th>

<th>

description

</th>

<th>

type

</th>

<th>

default

</th>

</tr>

<tr>

<th>

extensions

</th>

<td>

Array of extensions which extend the feature of SmartBlock

</td>

<td>

Array<Extension>

</td>

<td>

[  
  new Paragraph(),  
  new Heading2(),  
  new Heading3(),  
  new ListItem(),  
  new BulletList(),  
  new OrderedList(),  
  new Embed(),  
  new Code(),  
  new Table(),  
  new BlockQuote(),  
  new Strong(),  
  new Emphasis(),  
  new Underline(),  
  new Strike(),  
  new Link(),  
  new MoveDown(),  
  new MoveUp(),  
  new Trash(),  
  new DefaultKeys(),  
  new DefaultPlugins()  
]

</td>

</tr>

<tr>

<th>

onChange

</th>

<td>

Callback function which is called when the content of the editor is changed. You can get both html and json

</td>

<td>

Function

</td>

<td></td>

</tr>

<tr>

<th>

onInit

</th>

<td>

Callback function which is called when the editor is initialized

</td>

<td>

Function

</td>

<td></td>

</tr>

<tr>

<th>

json

</th>

<td>

The editor contents will be initialized with the json data

</td>

<td>

Object

</td>

<td>

{}

</td>

</tr>

<tr>

<th>

HTML

</th>

<td>

The editor contents will be initialized with the HTML

</td>

<td>

String

</td>

<td>

''

</td>

</tr>

<tr>

<th>

showTitle

</th>

<td>

Title will be shown

</td>

<td>

Boolean

</td>

<td>

false

</td>

</tr>

<tr>

<th>

showBackBtn

</th>

<td>

Btn to support history back will be shown

</td>

<td>

Boolean

</td>

<td>

false

</td>

</tr>

<tr>

<th>

autoSave

</th>

<td>

The HTML will be stored to the localstorage every time the content is changed

</td>

<td>

Boolean

</td>

<td>

false

</td>

</tr>

<tr>

<th>

getEditorRef

</th>

<td>

Get the editor ref object

</td>

<td>

Function

</td>

<td></td>

</tr>

</tbody>

</table>

## Extensions