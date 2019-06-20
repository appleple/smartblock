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
import UnderlineIcon from '../components/icons/Underline';
import { Extension } from '../types';
import { markActive } from '../utils';
var Underline = /** @class */ (function (_super) {
    __extends(Underline, _super);
    function Underline(schema) {
        var _this = _super.call(this) || this;
        _this.customSchema = schema;
        return _this;
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
            if (this.customSchema) {
                return this.customSchema;
            }
            return {
                group: 'mark',
                parseDOM: [{ tag: 'u' }, { style: 'text-decoration=underline' }],
                toDOM: function () { return [
                    'span',
                    {
                        style: 'text-decoration:underline'
                    }
                ]; }
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Underline.prototype, "icon", {
        get: function () {
            return React.createElement(UnderlineIcon, { style: { width: '24px', height: '24px' } });
        },
        enumerable: true,
        configurable: true
    });
    Underline.prototype.active = function (state) {
        return markActive(state.schema.marks.underline)(state);
    };
    Underline.prototype.onClick = function (state, dispatch) {
        toggleMark(state.schema.marks.underline)(state, dispatch);
    };
    return Underline;
}(Extension));
export default Underline;
//# sourceMappingURL=underline.js.map