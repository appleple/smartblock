import * as React from 'react';
import * as TestRenderer from 'react-test-renderer'
import Paragraph from '../src/extensions/paragraph';
import { setTextSelection } from 'prosemirror-utils';
import { TextSelection } from 'prosemirror-state';
import EditMenu from '../src/components/edit-menu';
import { getEditorViewFromExtensions } from './util';

describe('edit-menu', () => {
  it('should exist', () => {
    const view = getEditorViewFromExtensions([new Paragraph()]);
    const editMenu = TestRenderer.create(<EditMenu view={view} menu={[]} />);
    const item = editMenu.root.findByProps({
      className: 'smartblock-edit-menu'
    });
    expect(item).toBeTruthy();
  });
  it('should have proper position style', () => {
    const view = getEditorViewFromExtensions([new Paragraph()]);
    const editMenu = TestRenderer.create(<EditMenu view={view} menu={[]} />);
    const item = editMenu.root.findByProps({
      className: 'smartblock-edit-menu'
    });
    expect(item.props.style.top).toBe(0);
    TestRenderer.act(() => {
      editMenu.update(<EditMenu view={view} menu={[]} />);
    });
    // not focused
    expect(item.props.style.top).toBe(-1000);
    // TestRenderer.act(() => {
    //   view.dispatch(
    //     setTextSelection(0)(
    //       view.state.tr
    //     )
    //   );
    //   console.log(view);
    //   editMenu.update(<EditMenu view={view} menu={[]} />);
    // });
  });
})
