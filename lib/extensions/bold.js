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
import * as React from 'react';
import { toggleMark } from 'prosemirror-commands';
import EmIcon from '../components/icons/Em';
import { Extension } from '../types';
import { markActive } from '../utils';
var Bold = /** @class */ (function (_super) {
    __extends(Bold, _super);
    function Bold(schema) {
        var _this = _super.call(this) || this;
        _this.customSchema = schema;
        return _this;
    }
    Object.defineProperty(Bold.prototype, "name", {
        get: function () {
            return 'em';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Bold.prototype, "group", {
        get: function () {
            return 'mark';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Bold.prototype, "showMenu", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Bold.prototype, "schema", {
        get: function () {
            if (this.customSchema) {
                return this.customSchema;
            }
            return {
                group: 'mark',
                parseDOM: [{ tag: 'em' }, { style: 'font-style=italic' }],
                toDOM: function () { return [
                    'span',
                    {
                        style: 'font-style:italic'
                    }
                ]; }
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Bold.prototype, "icon", {
        get: function () {
            return React.createElement(EmIcon, { style: { width: '24px', height: '24px' } });
        },
        enumerable: true,
        configurable: true
    });
    Bold.prototype.active = function (state) {
        return markActive(state.schema.marks.em)(state);
    };
    Bold.prototype.onClick = function (state, dispatch) {
        toggleMark(state.schema.marks.em)(state, dispatch);
    };
    return Bold;
}(Extension));
export default Bold;
//# sourceMappingURL=bold.js.map