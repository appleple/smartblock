"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_fontawesome_1 = require("@fortawesome/react-fontawesome");
var fontawesome_free_solid_1 = require("@fortawesome/fontawesome-free-solid");
var prosemirror_commands_1 = require("prosemirror-commands");
var util_1 = require("../util");
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
            return React.createElement(react_fontawesome_1.default, { icon: fontawesome_free_solid_1.faParagraph });
        },
        enumerable: true,
        configurable: true
    });
    Paragraph.prototype.active = function (state) {
        return util_1.blockActive(state.schema.nodes.paragraph)(state);
    };
    Paragraph.prototype.enable = function (state) {
        return prosemirror_commands_1.setBlockType(state.schema.nodes.paragraph)(state);
    };
    Paragraph.prototype.onClick = function (state, dispatch) {
        prosemirror_commands_1.setBlockType(state.schema.nodes.paragraph)(state, dispatch);
    };
    return Paragraph;
}());
exports.default = Paragraph;
//# sourceMappingURL=paragraph.js.map