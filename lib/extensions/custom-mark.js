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
import { toggleMark } from 'prosemirror-commands';
import { Extension } from '../types';
import { markActive } from '../utils';
var CustomMark = /** @class */ (function (_super) {
    __extends(CustomMark, _super);
    function CustomMark(props) {
        return _super.call(this, props) || this;
    }
    Object.defineProperty(CustomMark.prototype, "name", {
        get: function () {
            return 'custom_mark';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CustomMark.prototype, "group", {
        get: function () {
            return 'mark';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CustomMark.prototype, "showMenu", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CustomMark.prototype, "schema", {
        get: function () {
            if (this.customSchema) {
                return this.customSchema;
            }
            var tag = this.tagName;
            return {
                group: 'mark',
                parseDOM: [{ tag: tag }],
                toDOM: function () { return [tag, 0]; }
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CustomMark.prototype, "icon", {
        get: function () {
            return this.customIcon;
        },
        enumerable: true,
        configurable: true
    });
    CustomMark.prototype.active = function (state) {
        return markActive(state.schema.marks.custom_mark)(state);
    };
    CustomMark.prototype.onClick = function (state, dispatch) {
        toggleMark(state.schema.marks.custom_mark)(state, dispatch);
    };
    return CustomMark;
}(Extension));
export default CustomMark;
//# sourceMappingURL=custom-mark.js.map