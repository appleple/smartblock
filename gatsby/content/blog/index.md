---
title: Hello World
date: "2015-05-01T22:12:03.284Z"
description: "Hello World"
toppage: "true"
---


## Features

*   Easy to use with SmartPhone
*   Fully customizable
*   Block based
*   Keep clean HTML and wipe out unnecessary tags
*   Get the result as **HTML** or **JSON**
*   copy and paste contents

## Install

```sh
$ npm install smartblock --save
```

## Usage

```js
import * as React from 'react';
import { render } from 'react-dom';
import { SmartBlock, GlobalStyle, Extensions } from 'smartblock';

render(<>
  <GlobalStyle />
  <SmartBlock 
    extensions={Extensions}
    html={'<h2>Hello World</h2><p>hello</p>'}
    onChange={({ json, html }) => { console.log(json, html);}}  
  />
</>, document.getElementById("app"));
```

## Extensions

### Blocks

- Pragraph
- Heading1
- Heading2
- Heading3
- Heading4
- Heading5
- Heading6
- OrderdList
- BulletList
- ListItem
- Blockquoe
- Table
- Code
- Image

### Marks

- Emphasis
- Strike
- Strong
- Underline

### Utils

- MoveDown
- MoveUp
- Trash
- DefaultKeys
- DefaultPlugins

## Customize

You can add custom block like this

```js
import { Extensions, CustomBlock, CustomMark } from 'smartblock';
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
import { Extension, CustomBlock, CustomMark } from 'smartblock';
Extension.push(new CustomMark({  tagName: 'span',  className: '.small',  icon: <SomeIconComponent />});

render(<>
  <GlobalStyle />
  <SmartBlock 
    extensions={Extensions}
    html={'<h2>Hello World</h2><p><small>hello</small></p>'}
    onChange={({ json, html }) => { console.log(json, html);}}  
  />
</>, document.getElementById("app"));
```