import * as React from 'react';
import { createRoot } from 'react-dom/client';

import SmartBlock from '../components/smartblock';
import Extensions from '../extensions/';

export default (item: string | HTMLElement, option: React.ComponentPropsWithoutRef<typeof SmartBlock>) => {
  const dom = typeof item === 'string' ? document.querySelector<HTMLElement>(item) : item;
  if (!option.extensions) {
    option.extensions = Extensions;
  }
  const root = createRoot(dom);
  root.render(
    <>
      <SmartBlock {...option} />
    </>
  );
};
