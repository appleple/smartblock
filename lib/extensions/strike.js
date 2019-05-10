"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_fontawesome_1 = require("@fortawesome/react-fontawesome");
var fontawesome_free_solid_1 = require("@fortawesome/fontawesome-free-solid");
var prosemirror_commands_1 = require("prosemirror-commands");
var util_1 = require("../util");
var StrikeThrough = /** @class */ (function () {
    function StrikeThrough() {
    }
    Object.defineProperty(StrikeThrough.prototype, "name", {
        get: function () {
            return 'strike';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StrikeThrough.prototype, "showMenu", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StrikeThrough.prototype, "schema", {
        get: function () {
            return {
                group: 'mark',
                parseDOM: [
                    { tag: 'strike' },
                    { style: 'text-decoration=line-through' },
                    { style: 'text-decoration-line=line-through' }
                ],
                toDOM: function () { return ['span', {
                        style: 'text-decoration-line:line-through'
                    }]; }
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StrikeThrough.prototype, "icon", {
        get: function () {
            return React.createElement(react_fontawesome_1.default, { icon: fontawesome_free_solid_1.faStrikethrough });
        },
        enumerable: true,
        configurable: true
    });
    StrikeThrough.prototype.active = function (state) {
        return util_1.markActive(state.schema.marks.strike)(state);
    };
    StrikeThrough.prototype.onClick = function (state, dispatch) {
        prosemirror_commands_1.toggleMark(state.schema.marks.strike)(state, dispatch);
    };
    return StrikeThrough;
}());
exports.default = StrikeThrough;
//# sourceMappingURL=strike.js.map