export default `SmartBlock.js is a JavaScript block based editor which enables you to write contents easily on websites even with **SmartPhone**.

<p class="s-paragraph">s-paragraph</p>
<p class="paragraph">paragraph</p>
<h2 class="s-heading2">s-heading2</h2>
<h2 class="heading2">heading2</h2>

## Features

*   Easy to use with SmartPhone
*   Fully customizable
*   Block based
*   Keep clean HTML and wipe out unnecessary tags
*   Get the result as **HTML** or **JSON**
*   copy and paste contents

## Install

\`\`\`
$ npm install smartblock --save
\`\`\`

## Usage

\`\`\`
import * as React from 'react';
import { render } from 'react-dom';
import 'smartblock/css/smartblock.css';
import { SmartBlock } from 'smartblock';

render(<>
  <SmartBlock 
    html={'<h2>Hello World</h2><p>hello</p>'}
    onChange={({ json, html }) => { console.log(json, html);}}  
  />
</>, document.getElementById("app"));
\`\`\`

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

\`\`\`
import { Extensions, CustomBlock, CustomMark } from 'smartblock';
import 'smartblock/css/smartblock.css';
Extensions.push(new CustomBlock({  
  tagName: 'div',
  className: '.alert',
  icon: <SomeIconComponent />
});

render(<>
  <SmartBlock 
    extensions={Extensions}
    html={'<h2>Hello World</h2><p>hello</p>'}
    onChange={({ json, html }) => { console.log(json, html);}}  
  />
</>, document.getElementById("app"));
\`\`\`

You can also add custom inline element like this

\`\`\`
import { Extension, CustomBlock, CustomMark } from 'smartblock';
import 'smartblock/css/smartblock.css';
Extension.push(new CustomMark({  tagName: 'span',  className: '.small',  icon: <SomeIconComponent />});

render(<>
  <SmartBlock 
    extensions={Extensions}
    html={'<h2>Hello World</h2><p><small>hello</small></p>'}
    onChange={({ json, html }) => { console.log(json, html);}}  
  />
</>, document.getElementById("app"));
\`\`\`

## Options

| Props        | description                                                                                                 | type               | default                    |
| ------------ | ----------------------------------------------------------------------------------------------------------- | ------------------ | -------------------------- |
| extensions   | Array of extensions which extend the feature of SmartBlock                                                  | Extension[]        | array of extensions        |
| onChange     | Callback function which is called when the content of the editor is changed. You can get both html and json | Function           |                            |
| onInit       | Callback function which is called when the editor is initialized                                            | Function           |                            |
| json         | The editor contents will be initialized with the json data                                                  | Object             | {}                                                                                                                                                                                                                                                                                                                                                                      |
| HTML         | The editor contents will be initialized with the HTML                                                       | String             | ''                                                                                                                                                                                                                                                                                                                                                                      |
| showTitle    | Title will be shown                                                                                         | Boolean            | false                                                                                                                                                                                                                                                                                                                                                                   |
| showBackBtn  | Btn to support history back will be shown                                                                   | Boolean            | false                                                                                                                                                                                                                                                                                                                                                                   |
| autoSave     | The HTML will be stored to the localstorage every time the content is changed                               | Boolean            | false                                                                                                                                                                                                                                                                                                                                                                   |
| getEditorRef | Get the editor ref object                                                                                   | Function           |                                                                                                                                                                                                                                                                                                                                                                         |
`;