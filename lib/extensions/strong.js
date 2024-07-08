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
var bold_1 = require("../components/icons/bold");
var types_1 = require("../types");
var utils_1 = require("../utils");
var constants_1 = require("../constants");
var Strong = /** @class */ (function (_super) {
    __extends(Strong, _super);
    function Strong(props) {
        return _super.call(this, props) || this;
    }
    Object.defineProperty(Strong.prototype, "name", {
        // @ts-ignore
        get: function () {
            return 'strong';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Strong.prototype, "group", {
        // @ts-ignore
        get: function () {
            return 'mark';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Strong.prototype, "showMenu", {
        // @ts-ignore
        get: function () {
            return true;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Strong.prototype, "schema", {
        // @ts-ignore
        get: function () {
            if (this.customSchema) {
                return this.customSchema;
            }
            return {
                group: 'mark',
                parseDOM: [
                    {
                        tag: 'strong',
                        priority: constants_1.BASE_PRIORITY,
                        style: 'font-weight=bold',
                    },
                ],
                toDOM: function () { return [
                    'strong',
                    {
                        style: 'font-weight:bold',
                    },
                ]; },
            };
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Strong.prototype, "icon", {
        // @ts-ignore
        get: function () {
            return React.createElement(bold_1.default, { style: { width: '24px', height: '24px' } });
        },
        enumerable: false,
        configurable: true
    });
    Strong.prototype.active = function (state) {
        return (0, utils_1.markActive)(state.schema.marks.strong)(state);
    };
    Strong.prototype.onClick = function (state, dispatch) {
        (0, prosemirror_commands_1.toggleMark)(state.schema.marks.strong)(state, dispatch);
    };
    return Strong;
}(types_1.Extension));
exports.default = Strong;
//# sourceMappingURL=strong.js.map