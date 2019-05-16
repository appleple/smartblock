import * as React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faBold } from '@fortawesome/fontawesome-free-solid';
import { toggleMark } from 'prosemirror-commands';
import { markActive } from '../utils';
var Strong = /** @class */ (function () {
    function Strong() {
    }
    Object.defineProperty(Strong.prototype, "name", {
        get: function () {
            return 'strong';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Strong.prototype, "showMenu", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Strong.prototype, "schema", {
        get: function () {
            return {
                group: 'mark',
                parseDOM: [
                    { tag: 'strong' },
                    { style: 'font-weight=bold' }
                ],
                toDOM: function () { return ['span', {
                        style: 'font-weight:bold'
                    }]; }
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Strong.prototype, "icon", {
        get: function () {
            return React.createElement(FontAwesomeIcon, { icon: faBold });
        },
        enumerable: true,
        configurable: true
    });
    Strong.prototype.active = function (state) {
        return markActive(state.schema.marks.strong)(state);
    };
    Strong.prototype.onClick = function (state, dispatch) {
        toggleMark(state.schema.marks.strong)(state, dispatch);
    };
    return Strong;
}());
export default Strong;
//# sourceMappingURL=strong.js.map