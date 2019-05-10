"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_fontawesome_1 = require("@fortawesome/react-fontawesome");
var fontawesome_free_solid_1 = require("@fortawesome/fontawesome-free-solid");
var prosemirror_commands_1 = require("prosemirror-commands");
var Strong = /** @class */ (function () {
    function Strong() {
    }
    Object.defineProperty(Strong.prototype, "name", {
        get: function () {
            return 'lift';
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
                group: 'block'
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Strong.prototype, "icon", {
        get: function () {
            return React.createElement(react_fontawesome_1.default, { icon: fontawesome_free_solid_1.faOutdent });
        },
        enumerable: true,
        configurable: true
    });
    Strong.prototype.onClick = function (state, dispatch) {
        prosemirror_commands_1.lift(state, dispatch);
    };
    return Strong;
}());
exports.default = Strong;
//# sourceMappingURL=lift.js.map