---
title: Top Page
date: "2015-05-01T22:12:03.284Z"
description: "Top Page"
toppage: "true"
---


## Installation

### Node.js package

Install the package via npm

```sh
$ npm install smartblock --save
```

### Load JavaScript from CDN

```html
<script src="https://unpkg.com/smartblock@latest/dist/standalone/index.js"></script>
```

## Usage

### As an React

In your JavaScript file:

```jsx
import * as React from 'react';
import { render } from 'react-dom';
import 'smartblock/css/smartblock.css';
import { SmartBlock, Extensions } from 'smartblock';

render(<>
  <SmartBlock
    extensions={Extensions}
    html={'<h2>Hello World</h2><p>hello</p>'}
    onChange={({ json, html }) => { console.log(json, html);}}
  />
  </>, document.getElementById("app")
);
```

### As an Native JavaScript

```html
<link rel="stylesheet" href="https://unpkg.com/smartblock@latest/css/smartblock.css" />
<script src="https://unpkg.com/smartblock@latest/dist/standalone/index.js"></script>
<script src="https://unpkg.com/smartblock@latest/dist/standalone/extensions/index.js"></script>
<!-- You can use smartblock without using JSX -->
<!-- bundle size is much smaller than the package build with react !-->
<script>
SmartBlock.Editor('#app', {
  html: '<h2>Hello World</h2><p>hello</p>',
  extensions: SmartBlock.Extensions,
  onChange: function(result) {
    console.log(result.json, result.html);
  }
});
</script>
```

[https://codepen.io/](https://codepen.io/appleple/pen/povGeQq#html-box)

### Compatibility

Edge, iOS Safari, Firefox, Chrome, Safari
