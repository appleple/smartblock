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
<script src="https://unpkg.com/smartblock@1.2.5/dist/smartblock.js"></script>
```

## Usage

### As an React

In your JavaScript file:

```jsx
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
  </>, document.getElementById("app")
);
```

### As an Native JavaScript

```html
<script src="https://unpkg.com/smartblock@1.2.5/dist/smartblock.js"></script>
<!-- You can use smartblock without using JSX -->
<!-- bundle size is much smaller than the package build with react !-->
<script>
SmartBlock('#app', {
  html: '<h2>Hello World</h2><p>hello</p>',
  onChange: function(result) {
    console.log(result.json, result.html);
  }
});
</script>
```

### Compatibility

IE11, and Edge, iOS Safari, Firefox, Chrome, Safari