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
var em_1 = require("../components/icons/em");
var types_1 = require("../types");
var utils_1 = require("../utils");
var Emphasis = /** @class */ (function (_super) {
    __extends(Emphasis, _super);
    function Emphasis(props) {
        return _super.call(this, props) || this;
    }
    Object.defineProperty(Emphasis.prototype, "name", {
        get: function () {
            return 'em';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Emphasis.prototype, "group", {
        get: function () {
            return 'mark';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Emphasis.prototype, "showMenu", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Emphasis.prototype, "schema", {
        get: function () {
            var _this = this;
            if (this.customSchema) {
                return this.customSchema;
            }
            return {
                group: 'mark',
                parseDOM: [{ tag: 'em' }, { style: 'font-style=italic' }],
                toDOM: function () { return [
                    'span',
                    {
                        class: _this.className,
                        style: 'font-style:italic'
                    }
                ]; }
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Emphasis.prototype, "icon", {
        get: function () {
            return React.createElement(em_1.default, { style: { width: '24px', height: '24px' } });
        },
        enumerable: true,
        configurable: true
    });
    Emphasis.prototype.active = function (state) {
        return utils_1.markActive(state.schema.marks.em)(state);
    };
    Emphasis.prototype.onClick = function (state, dispatch) {
        prosemirror_commands_1.toggleMark(state.schema.marks.em)(state, dispatch);
    };
    return Emphasis;
}(types_1.Extension));
exports.default = Emphasis;
//# sourceMappingURL=emphasis.js.map