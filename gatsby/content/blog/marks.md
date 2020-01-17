---
title: Marks
date: "2015-05-01T22:12:03.284Z"
description: "Marks"
---

When selecting the texts the tooltip will be shown. When clicking the tooltip button, inline element will be inserted.
We call this marks.

Same as Block Extensions, You can just import and use.

### Strong

![](./bold.png)

```jsx
import * as React from 'react';
import { render } from 'react-dom';
import Base from 'smartblock/lib/extensions/base';
import { 
  SmartBlock, 
  GlobalStyle, 
  Strong
} from 'smartblock';

const extensions = [
  ...Base,
  new Strong()
];

render(<>
  <GlobalStyle />
  <SmartBlock 
    extensions={extensions}
    html={'<p>hello <strong>world</strong></p>'}
    onChange={({ json, html }) => { console.log(json, html);}}  
  />
</>, document.getElementById("app"));
```



### Emphasis

![](./strong.png)

```jsx
import * as React from 'react';
import { render } from 'react-dom';
import Base from 'smartblock/lib/extensions/base';
import { 
  SmartBlock, 
  GlobalStyle, 
  Emphasis
} from 'smartblock';

const extensions = [
  ...Base,
  new Emphasis()
];

render(<>
  <GlobalStyle />
  <SmartBlock 
    extensions={extensions}
    html={'<p>hello <em>world</em></p>'}
    onChange={({ json, html }) => { console.log(json, html);}}  
  />
</>, document.getElementById("app"));
```


### Underline

![](./underline.png)

```jsx
import * as React from 'react';
import { render } from 'react-dom';
import Base from 'smartblock/lib/extensions/base';
import { 
  SmartBlock, 
  GlobalStyle, 
  Paragraph,
  Underline
} from 'smartblock';

const extensions = [
  ...Base,
  new Underline()
];

render(<>
  <GlobalStyle />
  <SmartBlock 
    extensions={extensions}
    html={'<p>hello <strong>world</strong></p>'}
    onChange={({ json, html }) => { console.log(json, html);}}  
  />
</>, document.getElementById("app"));
```

### Strike

![](./strike.png)

```jsx
import * as React from 'react';
import { render } from 'react-dom';
import Base from 'smartblock/lib/extensions/base';
import { 
  SmartBlock, 
  GlobalStyle, 
  Strike
} from 'smartblock';

const extensions = [
  ...Base,
  new Strike()
];

render(<>
  <GlobalStyle />
  <SmartBlock 
    extensions={extensions}
    html={'<p>hello <strong>world</strong></p>'}
    onChange={({ json, html }) => { console.log(json, html);}}  
  />
</>, document.getElementById("app"));
```

### Link

When you click the button below, input field will appear to enter the URL

![](./link.png)

![](./link-input.png)

```jsx
import * as React from 'react';
import { render } from 'react-dom';
import Base from 'smartblock/lib/extensions/base';
import { 
  SmartBlock, 
  GlobalStyle, 
  Link
} from 'smartblock';

const extensions = [
  ...Base,
  new Link()
];

render(<>
  <GlobalStyle />
  <SmartBlock 
    extensions={extensions}
    html={'<p>hello <a href="#">world</a></p>'}
    onChange={({ json, html }) => { console.log(json, html);}}  
  />
</>, document.getElementById("app"));
```