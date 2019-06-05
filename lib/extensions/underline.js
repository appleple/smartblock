import * as React from 'react';
import UnderlineIcon from '../components/icons/Underline';
import { toggleMark } from 'prosemirror-commands';
import { markActive } from '../utils';
var Underline = /** @class */ (function () {
    function Underline() {
    }
    Object.defineProperty(Underline.prototype, "name", {
        get: function () {
            return 'underline';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Underline.prototype, "group", {
        get: function () {
            return "mark";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Underline.prototype, "showMenu", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Underline.prototype, "schema", {
        get: function () {
            return {
                group: 'mark',
                parseDOM: [
                    { tag: 'u' },
                    { style: 'text-decoration=underline' }
                ],
                toDOM: function () { return ['span', {
                        style: 'text-decoration:underline'
                    }]; }
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Underline.prototype, "icon", {
        get: function () {
            return React.createElement(UnderlineIcon, { style: { width: '24px', height: '24px' } });
        },
        enumerable: true,
        configurable: true
    });
    Underline.prototype.active = function (state) {
        return markActive(state.schema.marks.underline)(state);
    };
    Underline.prototype.onClick = function (state, dispatch) {
        toggleMark(state.schema.marks.underline)(state, dispatch);
    };
    return Underline;
}());
export default Underline;
//# sourceMappingURL=underline.js.map