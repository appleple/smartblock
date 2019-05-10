"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_fontawesome_1 = require("@fortawesome/react-fontawesome");
var fontawesome_free_solid_1 = require("@fortawesome/fontawesome-free-solid");
var prosemirror_commands_1 = require("prosemirror-commands");
var util_1 = require("../util");
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
            return React.createElement(react_fontawesome_1.default, { icon: fontawesome_free_solid_1.faHeading });
        },
        enumerable: true,
        configurable: true
    });
    Heading2.prototype.active = function (state) {
        return util_1.blockActive(state.schema.nodes.heading2)(state);
    };
    Heading2.prototype.enable = function (state) {
        return prosemirror_commands_1.setBlockType(state.schema.nodes.heading2)(state);
    };
    Heading2.prototype.onClick = function (state, dispatch) {
        prosemirror_commands_1.setBlockType(state.schema.nodes.heading2)(state, dispatch);
    };
    return Heading2;
}());
exports.default = Heading2;
//# sourceMappingURL=heading2.js.map