import * as React from 'react';
import { render } from 'react-dom';

import SmartBlock from '../components/smartblock';
import Extensions from '../extensions/';
import GlobalStyle from '../utils/style';

export default (item: string | HTMLElement, option) => {
  const dom = typeof item === 'string' ? document.querySelector(item) : item;
  if (!option.extensions) {
    option.extensions = Extensions;
  }
  render(<>
  <GlobalStyle />
  <SmartBlock 
    {...option}
  />
  </>, dom);
}
