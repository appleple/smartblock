import * as React from 'react';
import { render } from 'react-dom';

import SmartBlock from '../components/smartblock';
import Extensions from '../extensions/';

export default (elementOrSelector: string | HTMLElement, option: React.ComponentPropsWithoutRef<typeof SmartBlock>) => {
  const element = typeof elementOrSelector === 'string' ? document.querySelector<HTMLElement>(elementOrSelector) : elementOrSelector;
  if (element === null) {
    throw new Error('The element is not found');
  }
  if (!option.extensions) {
    option.extensions = Extensions;
  }
  render(
    <>
      <SmartBlock {...option} />
    </>,
    element
  );
};
