import * as React from 'react';
import * as TestRenderer from 'react-test-renderer'
import Paragraph from '../src/extensions/paragraph';
import Strong from '../src/extensions/strong';
import InlineMenu from '../src/components/inline-menu';
import { getEditorViewFromExtensions } from './util';
import { TextSelection } from 'prosemirror-state';

describe('inline-menu', () => {
  it('should not have any components when not focused', () => {
    const paragraph = new Paragraph();
    const strong = new Strong();
    const view = getEditorViewFromExtensions([paragraph, strong]);
    /* mock view.coordsAtPos */
    view.coordsAtPos = (pos) => ({
      top: 100,
      left: 0,
      right: 0,
      bottom: 0
    });
    const editMenu = TestRenderer.create(<InlineMenu view={view} menu={[strong]} blockMenu={[paragraph]} />);
    expect(editMenu.root.children.length).toBe(0)
  });

  it('should not have have menu when no menu', () => {
    const paragraph = new Paragraph();
    const strong = new Strong();
    const view = getEditorViewFromExtensions([paragraph, strong]);
    /* mock view.coordsAtPos */
    view.coordsAtPos = (pos) => ({
      top: 100,
      left: 0,
      right: 0,
      bottom: 0
    });
    const editMenu = TestRenderer.create(<InlineMenu view={view} menu={[]} blockMenu={[paragraph]} />);
    expect(editMenu.root.children.length).toBe(0)
  });

  it('should have components when focused', () => {
    const paragraph = new Paragraph();
    const strong = new Strong();
    const view = getEditorViewFromExtensions([paragraph, strong]);
    /* mock view.coordsAtPos */
    view.coordsAtPos = (pos) => ({
      top: 100,
      left: 0,
      right: 0,
      bottom: 0
    });
    const editMenu = TestRenderer.create(<InlineMenu view={view} menu={[strong]} blockMenu={[paragraph]} />);
    const { tr } = view.state;
    tr.setSelection(TextSelection.create(tr.doc, 1, 4)); // select 'test'
    view.dispatch(tr);
    TestRenderer.act(() => {
      editMenu.update(<InlineMenu view={view} menu={[strong]} blockMenu={[paragraph]} />);
    });
    expect(editMenu.root.children.length).not.toBe(0);
  });

  it('should have proper position style', () => {
    const paragraph = new Paragraph();
    const strong = new Strong();
    const view = getEditorViewFromExtensions([paragraph, strong]);
    /* mock view.coordsAtPos */
    view.coordsAtPos = (pos) => ({
      top: 100,
      left: 0,
      right: 0,
      bottom: 0
    });
    const editMenu = TestRenderer.create(<InlineMenu view={view} menu={[strong]} blockMenu={[paragraph]} />);
    const { tr } = view.state;
    tr.setSelection(TextSelection.create(tr.doc, 1, 4)); // select 'test'
    view.dispatch(tr);
    TestRenderer.act(() => {
      editMenu.update(<InlineMenu view={view} menu={[strong]} blockMenu={[paragraph]} />);
    });
    const item = editMenu.root.findByProps({
      className: 'smartblock-inline-menu'
    });
    expect(item.props.style.top).not.toBe(0);
  });
})
