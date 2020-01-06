import * as React from 'react';
import * as TestRenderer from 'react-test-renderer'
import Paragraph from '../src/extensions/paragraph';
import Menu from '../src/components/menu';
import { getEditorViewFromExtensions } from './util';
import { setTextSelection } from 'prosemirror-utils';

describe('menu', () => {
  it('should not exist', () => {
    const view = getEditorViewFromExtensions([new Paragraph()]);
    const menu = TestRenderer.create(<Menu view={view} menu={[]} />);
    expect(menu.root.children.length).toBe(0);
  });

  it('should have proper position style', () => {
    const paragraph = new Paragraph();
    const view = getEditorViewFromExtensions([paragraph]);
    const menu = TestRenderer.create(<Menu view={view} menu={[paragraph]} />);
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
    TestRenderer.act(() => {
      menu.update(<Menu view={view} menu={[paragraph]} />);
    });
    const item = menu.root.findByProps({
      className: 'smartblock-menu'
    });
    expect(item.props.style.top).not.toBe(0);
    expect(item.props.style.top).not.toBe(-1000);
  });

  it('should not render when the extension does not allow to show menu', () => {
    class TestParagraph extends Paragraph {
      get hideMenuOnFocus() {
        return true;
      }
    }
    const paragraph = new TestParagraph();
    const view = getEditorViewFromExtensions([paragraph]);
    const menu = TestRenderer.create(<Menu view={view} menu={[paragraph]} />);
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
    TestRenderer.act(() => {
      menu.update(<Menu view={view} menu={[paragraph]} />);
    });
    expect(menu.root.children.length).toBe(0);
  });
})
