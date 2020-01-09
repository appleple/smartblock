import * as React from 'react';
import * as TestRenderer from 'react-test-renderer'
import Extensions from '../src/extensions/';
import SmartBlock from '../src/components/smartblock';
import { getEditorViewFromExtensions } from './util';
import { setTextSelection } from 'prosemirror-utils';

describe('smartblock', () => {
  it('should have title', () => {
    const smartblock = TestRenderer.create(<SmartBlock
      showTitle={true}
      extensions={Extensions}
      html="test"
    />);
    const title = smartblock.root.findAllByProps({
      className: 'smartblock-title'
    });
    expect(title).toBeTruthy();
  });
});