import * as React from 'react';
import { toggleMark } from 'prosemirror-commands';
import EmIcon from '../components/icons/Em';
import { markActive } from '../utils';
var Strong = /** @class */ (function () {
    function Strong() {
    }
    Object.defineProperty(Strong.prototype, "name", {
        get: function () {
            return 'em';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Strong.prototype, "group", {
        get: function () {
            return 'mark';
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
                parseDOM: [{ tag: 'em' }, { style: 'font-style=italic' }],
                toDOM: function () { return [
                    'span',
                    {
                        style: 'font-style:italic'
                    }
                ]; }
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Strong.prototype, "icon", {
        get: function () {
            return React.createElement(EmIcon, { style: { width: '24px', height: '24px' } });
        },
        enumerable: true,
        configurable: true
    });
    Strong.prototype.active = function (state) {
        return markActive(state.schema.marks.em)(state);
    };
    Strong.prototype.onClick = function (state, dispatch) {
        toggleMark(state.schema.marks.em)(state, dispatch);
    };
    return Strong;
}());
export default Strong;
//# sourceMappingURL=em.js.map