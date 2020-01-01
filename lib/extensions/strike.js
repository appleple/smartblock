"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var prosemirror_commands_1 = require("prosemirror-commands");
var Strike_1 = require("../components/icons/Strike");
var types_1 = require("../types");
var utils_1 = require("../utils");
var StrikeThrough = /** @class */ (function (_super) {
    __extends(StrikeThrough, _super);
    function StrikeThrough(props) {
        return _super.call(this, props) || this;
    }
    Object.defineProperty(StrikeThrough.prototype, "name", {
        get: function () {
            return 'strike';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StrikeThrough.prototype, "group", {
        get: function () {
            return 'mark';
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
            var _this = this;
            if (this.customSchema) {
                return this.customSchema;
            }
            return {
                group: 'mark',
                parseDOM: [
                    { tag: 'strike' },
                    { style: 'text-decoration=line-through' },
                    { style: 'text-decoration-line=line-through' }
                ],
                toDOM: function () { return [
                    'span',
                    {
                        style: 'text-decoration-line:line-through',
                        class: _this.className
                    }
                ]; }
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StrikeThrough.prototype, "icon", {
        get: function () {
            return React.createElement(Strike_1.default, { style: { width: '24px', height: '24px' } });
        },
        enumerable: true,
        configurable: true
    });
    StrikeThrough.prototype.active = function (state) {
        return utils_1.markActive(state.schema.marks.strike)(state);
    };
    StrikeThrough.prototype.onClick = function (state, dispatch) {
        prosemirror_commands_1.toggleMark(state.schema.marks.strike)(state, dispatch);
    };
    return StrikeThrough;
}(types_1.Extension));
exports.default = StrikeThrough;
//# sourceMappingURL=strike.js.map