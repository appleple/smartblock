import { Plugin } from 'prosemirror-state'
import { setBlockType } from 'prosemirror-commands'
import { getParentNodeFromState } from '../../utils'

export default () => {
  return new Plugin({
    props: {
      handleTextInput(view, _from, _to, text) {
        const { state } = view
        const node = getParentNodeFromState(state)
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
