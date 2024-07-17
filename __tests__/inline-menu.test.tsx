import * as React from 'react';
import { render, act } from '@testing-library/react';
import Paragraph from '../src/extensions/paragraph';
import Strong from '../src/extensions/strong';
import InlineMenu from '../src/components/inline-menu';
import { getEditorViewFromExtensions } from './util';
import { TextSelection } from 'prosemirror-state';

jest.mock('uuid', () => {
  return {
    v4: jest.fn(() => `test-key-${Math.random().toString(36).substr(2, 9)}`)
  };
});

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
    const { container } = render(<InlineMenu view={view} menu={[strong]} blockMenu={[paragraph]} />);
    expect(container.children).toHaveLength(0);
  });

  it('should not have menu when no menu', () => {
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
    const { container } = render(<InlineMenu view={view} menu={[]} blockMenu={[paragraph]} />);
    expect(container.children).toHaveLength(0);
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
    const { container, rerender } = render(<InlineMenu view={view} menu={[strong]} blockMenu={[paragraph]} />);
    const { tr } = view.state;
    tr.setSelection(TextSelection.create(tr.doc, 1, 4)); // select 'test'
    view.dispatch(tr);
    act(() => {
      rerender(<InlineMenu view={view} menu={[strong]} blockMenu={[paragraph]} />);
    });
    expect(container.children).not.toHaveLength(0);
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
    const { container, rerender } = render(<InlineMenu view={view} menu={[strong]} blockMenu={[paragraph]} />);
    const { tr } = view.state;
    tr.setSelection(TextSelection.create(tr.doc, 1, 4)); // select 'test'
    view.dispatch(tr);
    act(() => {
      rerender(<InlineMenu view={view} menu={[strong]} blockMenu={[paragraph]} />);
    });
    const item = container.querySelector('.smartblock-inline-menu') as HTMLDivElement;
    expect(item).toBeTruthy();
    expect(item.style.top).not.toBe('0px');
  });
});
