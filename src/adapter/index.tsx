import * as React from 'react';
import { createRoot } from 'react-dom/client';

import SmartBlock from '../components/smartblock';
import Extensions from '../extensions/';

/**
 * Reactをバンドル配布するためのエントリーポイント（Reactを含めて配布するためReactのバージョンは最新で大丈夫）
 * @param elementOrSelector
 * @param option
 */
export default function editor (elementOrSelector: string | HTMLElement, option: React.ComponentPropsWithoutRef<typeof SmartBlock>) {
  const element = typeof elementOrSelector === 'string' ? document.querySelector<HTMLElement>(elementOrSelector) : elementOrSelector;
  if (element === null) {
    throw new Error('The element is not found');
  }
  if (!option.extensions) {
    option.extensions = Extensions;
  }
  const root = createRoot(element);
  root.render(
    <>
      <SmartBlock {...option} />
    </>
  );
};
