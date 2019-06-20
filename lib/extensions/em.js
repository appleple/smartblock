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
var Strong = /** @class */ (function (_super) {
    __extends(Strong, _super);
    function Strong(schema) {
        var _this = _super.call(this) || this;
        _this.customSchema = schema;
        return _this;
    }
    Object.defineProperty(Strong.prototype, "name", {
        get: function () {
            return 'em';
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
    Object.defineProperty(Strong.prototype, "icon", {
        get: function () {
            return React.createElement(EmIcon, { style: { width: '24px', height: '24px' } });
        },
        enumerable: true,
        configurable: true
    });
    Strong.prototype.active = function (state) {
        return markActive(state.schema.marks.em)(state);
    };
    Strong.prototype.onClick = function (state, dispatch) {
        toggleMark(state.schema.marks.em)(state, dispatch);
    };
    return Strong;
}(Extension));
export default Strong;
//# sourceMappingURL=em.js.map