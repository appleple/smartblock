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
var Underline_1 = require("../components/icons/Underline");
var types_1 = require("../types");
var utils_1 = require("../utils");
var Underline = /** @class */ (function (_super) {
    __extends(Underline, _super);
    function Underline(props) {
        return _super.call(this, props) || this;
    }
    Object.defineProperty(Underline.prototype, "name", {
        get: function () {
            return 'underline';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Underline.prototype, "group", {
        get: function () {
            return 'mark';
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
            var _this = this;
            if (this.customSchema) {
                return this.customSchema;
            }
            return {
                group: 'mark',
                parseDOM: [{ tag: 'u' }, { style: 'text-decoration=underline' }],
                toDOM: function () { return [
                    'span',
                    {
                        style: 'text-decoration:underline',
                        class: _this.className
                    }
                ]; }
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Underline.prototype, "icon", {
        get: function () {
            return React.createElement(Underline_1.default, { style: { width: '24px', height: '24px' } });
        },
        enumerable: true,
        configurable: true
    });
    Underline.prototype.active = function (state) {
        return utils_1.markActive(state.schema.marks.underline)(state);
    };
    Underline.prototype.onClick = function (state, dispatch) {
        prosemirror_commands_1.toggleMark(state.schema.marks.underline)(state, dispatch);
    };
    return Underline;
}(types_1.Extension));
exports.default = Underline;
//# sourceMappingURL=underline.js.map