import * as React from 'react';
import { schema, doc, p, strong } from 'jest-prosemirror'
import * as TestRenderer from 'react-test-renderer'
import { PaperEditor, GlobalStyle } from '../src'
import Block from '../src/extensions/custom-block'
import Mark from '../src/extensions/custom-mark'
import extensions from '../src/extensions'

describe('describe', () => {
  it('it', () => {
    const paperEditor = TestRenderer.create(<PaperEditor extensions={extensions} html="" />);
  })
})
