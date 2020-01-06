import Paragraph from '../src/extensions/paragraph';
import { setTextSelection } from 'prosemirror-utils';
import { getEditorViewFromExtensions } from './util';
import { getParentNodeFromState } from '../src/utils';

describe('utils test', () => {
  it('should get proper node from pos', () => {
    const view = getEditorViewFromExtensions([new Paragraph()]);
    view.dispatch(
      setTextSelection(1)(
        view.state.tr
      )
    );
    const node = getParentNodeFromState(view.state);
    expect(node.type.name).toEqual('paragraph');
  });
});