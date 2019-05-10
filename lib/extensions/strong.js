"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_fontawesome_1 = require("@fortawesome/react-fontawesome");
var fontawesome_free_solid_1 = require("@fortawesome/fontawesome-free-solid");
var prosemirror_commands_1 = require("prosemirror-commands");
var util_1 = require("../util");
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
            return React.createElement(react_fontawesome_1.default, { icon: fontawesome_free_solid_1.faBold });
        },
        enumerable: true,
        configurable: true
    });
    Strong.prototype.active = function (state) {
        return util_1.markActive(state.schema.marks.strong)(state);
    };
    Strong.prototype.onClick = function (state, dispatch) {
        prosemirror_commands_1.toggleMark(state.schema.marks.strong)(state, dispatch);
    };
    return Strong;
}());
exports.default = Strong;
//# sourceMappingURL=strong.js.map