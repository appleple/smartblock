import * as React from 'react';
import { render, act } from '@testing-library/react';
import Paragraph from '../src/extensions/paragraph';
import Menu from '../src/components/menu';
import { getEditorViewFromExtensions } from './util';
import { setTextSelection } from 'prosemirror-utils';

jest.mock('uuid', () => {
  return {
    v4: jest.fn(() => `test-key-${Math.random().toString(36).substr(2, 9)}`)
  };
});

describe('menu', () => {
  it('should not exist', () => {
    const view = getEditorViewFromExtensions([new Paragraph()]);
    const { container } = render(<Menu view={view} menu={[]} />);
    expect(container.children).toHaveLength(0);
  });

  it('should have proper position style', () => {
    const paragraph = new Paragraph();
    const view = getEditorViewFromExtensions([paragraph]);
    const { container, rerender } = render(<Menu view={view} menu={[paragraph]} />);
    view.dispatch(
      setTextSelection(1)(
        view.state.tr
      )
    );
    view.coordsAtPos = () => ({
      top: 100,
      left: 0,
      right: 0,
      bottom: 0
    });
    act(() => {
      rerender(<Menu view={view} menu={[paragraph]} />);
    });
    const item = container.querySelector<HTMLDivElement>('.smartblock-menu') as HTMLDivElement;
    expect(item).toBeTruthy();
    expect(item.style.top).not.toBe('0px');
    expect(item.style.top).not.toBe('-1000px');
  });

  it('should not render when the extension does not allow to show menu', () => {
    class TestParagraph extends Paragraph {
      // @ts-ignore
      get hideMenuOnFocus() {
        return true;
      }
    }
    const paragraph = new TestParagraph();
    const view = getEditorViewFromExtensions([paragraph]);
    const { container, rerender } = render(<Menu view={view} menu={[paragraph]} />);
    view.dispatch(
      setTextSelection(1)(
        view.state.tr
      )
    );
    view.coordsAtPos = () => ({
      top: 100,
      left: 0,
      right: 0,
      bottom: 0
    });
    act(() => {
      rerender(<Menu view={view} menu={[paragraph]} />);
    });
    expect(container.children).toHaveLength(0);
  });

  it('should have custom-menu when the selected extension has', () => {
    const paragraph = new Paragraph();
    const view = getEditorViewFromExtensions([paragraph]);
    const { container, rerender } = render(<Menu view={view} menu={[paragraph]} />);
    view.dispatch(
      setTextSelection(1)(
        view.state.tr
      )
    );
    view.coordsAtPos = () => ({
      top: 100,
      left: 0,
      right: 0,
      bottom: 0
    });
    act(() => {
      rerender(<Menu view={view} menu={[paragraph]} />);
    });
    const item = container.querySelector('.smartblock-custom-menu');
    expect(item).toBeTruthy();
  });

  it('should not have custom-menu when the selected extension return null', () => {
    class TestParagraph extends Paragraph {
      customMenu() {
        return null;
      }
    }
    const paragraph = new TestParagraph();
    const view = getEditorViewFromExtensions([paragraph]);
    const { container, rerender } = render(<Menu view={view} menu={[paragraph]} />);
    view.dispatch(
      setTextSelection(1)(
        view.state.tr
      )
    );
    view.coordsAtPos = () => ({
      top: 100,
      left: 0,
      right: 0,
      bottom: 0
    });
    act(() => {
      rerender(<Menu view={view} menu={[paragraph]} />);
    });
    expect(container.querySelector('.smartblock-custom-menu')).toBeNull();
  });

  // it('should have active menu', () => {
  //   const paragraph = new Paragraph();
  //   const view = getEditorViewFromExtensions([paragraph]);
  //   const { container, rerender } = render(<Menu view={view} menu={[paragraph]} />);
  //   view.dispatch(
  //     setTextSelection(1)(
  //       view.state.tr
  //     )
  //   );
  //   view.coordsAtPos = () => ({
  //     top: 100,
  //     left: 0,
  //     right: 0,
  //     bottom: 0
  //   });
  //   act(() => {
  //     rerender(<Menu view={view} menu={[paragraph]} />);
  //   });
  //   const item = container.querySelector<HTMLDivElement>('.smartblock-custom-menu') as HTMLDivElement;
  //   expect(item).toBeTruthy();
  //   const button = item.querySelector('[active="true"]');
  //   expect(button).toBeTruthy();
  // });
});
