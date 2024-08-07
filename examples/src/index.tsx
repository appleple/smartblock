// import SmartBlock from '../../src/adapter';
import extensions from '../../src/extensions';
import Code from '../../src/extensions/code';
import Image from '../../src/extensions/image';
import CustomBlock from '../../src/extensions/custom-block';
import markdown from './sample';
import * as showdown from 'showdown';
import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import SmartBlock from '../../src/components/smartblock';

extensions.push(new Code());
extensions.push(
  new Image({
    imgClassName: 'small',
    withCaption: false,
    imgFullClassName: 'full',
  })
);

// @ts-ignore
extensions.push(
  new CustomBlock({
    tagName: 'p',
    customName: 's-paragraph',
    className: 's-paragraph',
    icon: `
    <svg height="24" width="24">
      <circle cx="12" cy="12" r="12" fill="red" />
    </svg>`,
  })
);

// @ts-ignore
extensions.push(
  new CustomBlock({
    tagName: 'h2',
    customName: 's-heading2',
    className: 's-heading2',
  })
);

// SmartBlock('#app', {
//   showTitle: true,
//   markdown,
//   showdown,
//   outputMarkdown: true,
//   extensions,
//   onChange: ({ markdown }) => {
//   }
// });

const root = createRoot(document.getElementById('app')!);
root.render(
  <StrictMode>
    <SmartBlock
      extensions={extensions}
      showdown={showdown}
      markdown={markdown}
      showTitle={true}
      onChange={({ html }) => console.log(html)}
    />
  </StrictMode>
);
