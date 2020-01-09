import * as React from 'react';
import { render } from 'react-dom';

import SmartBlock from '../components/smart-block';
import GlobalStyle from '../utils/style';

export default (item: string | HTMLElement, option) => {
  const dom = typeof item === 'string' ? document.querySelector(item) : item;
  render(<>
  <GlobalStyle />
  <SmartBlock 
    {...option}
  />
  </>, dom);
}
