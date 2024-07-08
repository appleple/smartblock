"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var prosemirror_commands_1 = require("prosemirror-commands");
var strike_1 = require("../components/icons/strike");
var types_1 = require("../types");
var utils_1 = require("../utils");
var constants_1 = require("../constants");
var StrikeThrough = /** @class */ (function (_super) {
    __extends(StrikeThrough, _super);
    function StrikeThrough(props) {
        return _super.call(this, props) || this;
    }
    Object.defineProperty(StrikeThrough.prototype, "name", {
        // @ts-ignore
        get: function () {
            return 'strike';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StrikeThrough.prototype, "group", {
        // @ts-ignore
        get: function () {
            return 'mark';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StrikeThrough.prototype, "showMenu", {
        // @ts-ignore
        get: function () {
            return true;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StrikeThrough.prototype, "schema", {
        // @ts-ignore
        get: function () {
            var _this = this;
            if (this.customSchema) {
                return this.customSchema;
            }
            return {
                group: 'mark',
                parseDOM: [
                    {
                        tag: 'strike',
                        priority: constants_1.BASE_PRIORITY,
                        style: 'text-decoration=line-through' || 'text-decoration-line=line-through',
                    },
                ],
                toDOM: function () { return [
                    'span',
                    {
                        style: 'text-decoration-line:line-through',
                        class: _this.className,
                    },
                ]; },
            };
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StrikeThrough.prototype, "icon", {
        // @ts-ignore
        get: function () {
            return React.createElement(strike_1.default, { style: { width: '24px', height: '24px' } });
        },
        enumerable: false,
        configurable: true
    });
    StrikeThrough.prototype.active = function (state) {
        return (0, utils_1.markActive)(state.schema.marks.strike)(state);
    };
    StrikeThrough.prototype.onClick = function (state, dispatch) {
        (0, prosemirror_commands_1.toggleMark)(state.schema.marks.strike)(state, dispatch);
    };
    return StrikeThrough;
}(types_1.Extension));
exports.default = StrikeThrough;
//# sourceMappingURL=strike.js.map