import * as React from 'react';
import * as TestRenderer from 'react-test-renderer'
import Paragraph from '../src/extensions/paragraph';
import { setTextSelection } from 'prosemirror-utils';
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
    view.dispatch(
      setTextSelection(1)(
        view.state.tr
      )
    );

    /* mock view.coordsAtPos */
    view.coordsAtPos = (pos) => ({
      top: 100,
      left: 0,
      right: 0,
      bottom: 0
    });

    TestRenderer.act(() => {
      editMenu.update(<EditMenu view={view} menu={[]} />);
    });
    expect(item.props.style.top).not.toBe(0);
    expect(item.props.style.top).not.toBe(-1000);
  });
})
