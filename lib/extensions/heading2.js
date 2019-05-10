import * as React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faHeading } from '@fortawesome/fontawesome-free-solid';
import { setBlockType } from 'prosemirror-commands';
import { blockActive } from '../util';
var Heading2 = /** @class */ (function () {
    function Heading2() {
    }
    Object.defineProperty(Heading2.prototype, "name", {
        get: function () {
            return 'heading2';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Heading2.prototype, "showMenu", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Heading2.prototype, "schema", {
        get: function () {
            return {
                content: "inline*",
                group: "block",
                defining: true,
                parseDOM: [
                    { tag: "h2" },
                ],
                toDOM: function (node) { return ["h2", 0]; }
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Heading2.prototype, "icon", {
        get: function () {
            return React.createElement(FontAwesomeIcon, { icon: faHeading });
        },
        enumerable: true,
        configurable: true
    });
    Heading2.prototype.active = function (state) {
        return blockActive(state.schema.nodes.heading2)(state);
    };
    Heading2.prototype.enable = function (state) {
        return setBlockType(state.schema.nodes.heading2)(state);
    };
    Heading2.prototype.onClick = function (state, dispatch) {
        setBlockType(state.schema.nodes.heading2)(state, dispatch);
    };
    return Heading2;
}());
export default Heading2;
//# sourceMappingURL=heading2.js.map