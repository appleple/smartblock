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
var underline_1 = require("../components/icons/underline");
var types_1 = require("../types");
var utils_1 = require("../utils");
var constants_1 = require("../constants");
var Underline = /** @class */ (function (_super) {
    __extends(Underline, _super);
    function Underline(props) {
        return _super.call(this, props) || this;
    }
    Object.defineProperty(Underline.prototype, "name", {
        // @ts-ignore
        get: function () {
            return 'underline';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Underline.prototype, "group", {
        // @ts-ignore
        get: function () {
            return 'mark';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Underline.prototype, "showMenu", {
        // @ts-ignore
        get: function () {
            return true;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Underline.prototype, "schema", {
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
                        tag: 'u',
                        priority: constants_1.BASE_PRIORITY,
                        style: 'text-decoration=underline',
                    },
                ],
                toDOM: function () { return [
                    'span',
                    {
                        style: 'text-decoration:underline',
                        class: _this.className,
                    },
                ]; },
            };
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Underline.prototype, "icon", {
        // @ts-ignore
        get: function () {
            return React.createElement(underline_1.default, { style: { width: '24px', height: '24px' } });
        },
        enumerable: false,
        configurable: true
    });
    Underline.prototype.active = function (state) {
        return (0, utils_1.markActive)(state.schema.marks.underline)(state);
    };
    Underline.prototype.onClick = function (state, dispatch) {
        (0, prosemirror_commands_1.toggleMark)(state.schema.marks.underline)(state, dispatch);
    };
    return Underline;
}(types_1.Extension));
exports.default = Underline;
//# sourceMappingURL=underline.js.map