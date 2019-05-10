import * as React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faParagraph } from '@fortawesome/fontawesome-free-solid';
import { setBlockType } from 'prosemirror-commands';
import { blockActive } from '../util';
var Paragraph = /** @class */ (function () {
    function Paragraph() {
    }
    Object.defineProperty(Paragraph.prototype, "name", {
        get: function () {
            return 'paragraph';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Paragraph.prototype, "showMenu", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Paragraph.prototype, "schema", {
        get: function () {
            return {
                content: 'inline*',
                group: 'block',
                parseDOM: [{
                        tag: 'p'
                    }],
                toDOM: function () { return ["p", 0]; }
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Paragraph.prototype, "icon", {
        get: function () {
            return React.createElement(FontAwesomeIcon, { icon: faParagraph });
        },
        enumerable: true,
        configurable: true
    });
    Paragraph.prototype.active = function (state) {
        return blockActive(state.schema.nodes.paragraph)(state);
    };
    Paragraph.prototype.enable = function (state) {
        return setBlockType(state.schema.nodes.paragraph)(state);
    };
    Paragraph.prototype.onClick = function (state, dispatch) {
        setBlockType(state.schema.nodes.paragraph)(state, dispatch);
    };
    return Paragraph;
}());
export default Paragraph;
//# sourceMappingURL=paragraph.js.map