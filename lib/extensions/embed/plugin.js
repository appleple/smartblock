"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var prosemirror_state_1 = require("prosemirror-state");
var prosemirror_commands_1 = require("prosemirror-commands");
var utils_1 = require("../../utils");
exports.default = (function () {
    return new prosemirror_state_1.Plugin({
        props: {
            handleTextInput: function (view, _from, _to, text) {
                var state = view.state;
                var node = utils_1.getParentNodeFromState(state);
                if (node.type.name === 'embed') {
                    prosemirror_commands_1.setBlockType(state.schema.nodes.embed, {
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