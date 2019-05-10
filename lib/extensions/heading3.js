"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var prosemirror_commands_1 = require("prosemirror-commands");
var util_1 = require("../util");
var Heading3 = /** @class */ (function () {
    function Heading3() {
    }
    Object.defineProperty(Heading3.prototype, "name", {
        get: function () {
            return 'heading3';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Heading3.prototype, "showMenu", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Heading3.prototype, "schema", {
        get: function () {
            return {
                content: "inline*",
                group: "block",
                defining: true,
                parseDOM: [
                    { tag: "h3" },
                ],
                toDOM: function (node) { return ["h3", 0]; }
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Heading3.prototype, "icon", {
        get: function () {
            return 'H2';
        },
        enumerable: true,
        configurable: true
    });
    Heading3.prototype.active = function (state) {
        return util_1.blockActive(state.schema.nodes.heading3)(state);
    };
    Heading3.prototype.enable = function (state) {
        return prosemirror_commands_1.setBlockType(state.schema.nodes.heading3)(state);
    };
    Heading3.prototype.onClick = function (state, dispatch) {
        prosemirror_commands_1.setBlockType(state.schema.nodes.heading3)(state, dispatch);
    };
    return Heading3;
}());
exports.default = Heading3;
//# sourceMappingURL=heading3.js.map