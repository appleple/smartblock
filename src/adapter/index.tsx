import * as React from 'react';
import { render } from 'react-dom';

import SmartBlock from '../components/smartblock';
import Extensions from '../extensions/';

export default (item: string | HTMLElement, option: React.ComponentPropsWithoutRef<typeof SmartBlock>) => {
  const dom = typeof item === 'string' ? document.querySelector(item) : item;
  if (!option.extensions) {
    option.extensions = Extensions;
  }
  render(
    <>
      <SmartBlock {...option} />
    </>,
    dom
  );
};
