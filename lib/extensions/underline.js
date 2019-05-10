"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_fontawesome_1 = require("@fortawesome/react-fontawesome");
var fontawesome_free_solid_1 = require("@fortawesome/fontawesome-free-solid");
var prosemirror_commands_1 = require("prosemirror-commands");
var util_1 = require("../util");
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
            return React.createElement(react_fontawesome_1.default, { icon: fontawesome_free_solid_1.faUnderline });
        },
        enumerable: true,
        configurable: true
    });
    Underline.prototype.active = function (state) {
        return util_1.markActive(state.schema.marks.underline)(state);
    };
    Underline.prototype.onClick = function (state, dispatch) {
        prosemirror_commands_1.toggleMark(state.schema.marks.underline)(state, dispatch);
    };
    return Underline;
}());
exports.default = Underline;
//# sourceMappingURL=underline.js.map