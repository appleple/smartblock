import { Plugin } from 'prosemirror-state';
import { getParentNodeFromState } from '../../utils';
import { setBlockType } from 'prosemirror-commands';
export default (function () {
    return new Plugin({
        props: {
            handleTextInput: function (view, _from, _to, text) {
                var state = view.state;
                var node = getParentNodeFromState(state);
                if (node.type.name === 'embed') {
                    setBlockType(state.schema.nodes.embed, {
                        src: node.textContent + text
                    })(state, view.dispatch);
                    return false;
                }
                return false;
            }
        }
    });
});
//# sourceMappingURL=plugin.js.map