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
var bold_1 = require("../components/icons/bold");
var types_1 = require("../types");
var utils_1 = require("../utils");
var Strong = /** @class */ (function (_super) {
    __extends(Strong, _super);
    function Strong(props) {
        return _super.call(this, props) || this;
    }
    Object.defineProperty(Strong.prototype, "name", {
        get: function () {
            return 'strong';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Strong.prototype, "group", {
        get: function () {
            return 'mark';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Strong.prototype, "showMenu", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Strong.prototype, "schema", {
        get: function () {
            if (this.customSchema) {
                return this.customSchema;
            }
            return {
                group: 'mark',
                parseDOM: [{ tag: 'strong' }, { style: 'font-weight=bold' }],
                toDOM: function () { return [
                    'strong',
                    {
                        style: 'font-weight:bold'
                    }
                ]; }
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Strong.prototype, "icon", {
        get: function () {
            return React.createElement(bold_1.default, { style: { width: '24px', height: '24px' } });
        },
        enumerable: true,
        configurable: true
    });
    Strong.prototype.active = function (state) {
        return utils_1.markActive(state.schema.marks.strong)(state);
    };
    Strong.prototype.onClick = function (state, dispatch) {
        prosemirror_commands_1.toggleMark(state.schema.marks.strong)(state, dispatch);
    };
    return Strong;
}(types_1.Extension));
exports.default = Strong;
//# sourceMappingURL=strong.js.map