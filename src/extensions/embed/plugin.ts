import { Plugin } from 'prosemirror-state';
import { getParentNodeFromState } from '../../utils';
import { setBlockType } from 'prosemirror-commands'

export default () => {
  return new Plugin({
    props: {
      handleTextInput(view, from, to, text) {
        const { state } = view;
        const node = getParentNodeFromState(state);
        if (node.type.name === 'embed') {
          setBlockType(state.schema.nodes.embed, {
            src: node.textContent + text
          })(state, view.dispatch)
          return false;
        }
        return false;
      }
    }
  })
}