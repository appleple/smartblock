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
var prosemirror_commands_1 = require("prosemirror-commands");
var types_1 = require("../types");
var utils_1 = require("../utils");
var constants_1 = require("../constants");
var CustomMark = /** @class */ (function (_super) {
    __extends(CustomMark, _super);
    function CustomMark(props) {
        if (!props.customName) {
            props.customName = (0, utils_1.getUniqId)();
        }
        return _super.call(this, props) || this;
    }
    Object.defineProperty(CustomMark.prototype, "name", {
        // @ts-ignore
        get: function () {
            return this.customName;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CustomMark.prototype, "group", {
        // @ts-ignore
        get: function () {
            return 'mark';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CustomMark.prototype, "showMenu", {
        // @ts-ignore
        get: function () {
            return true;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CustomMark.prototype, "schema", {
        // @ts-ignore
        get: function () {
            if (this.customSchema) {
                return this.customSchema;
            }
            var _a = this, className = _a.className, tagName = _a.tagName;
            var tag = tagName;
            if (className) {
                tag += ".".concat(className.replace(/\s/g, '.'));
            }
            return {
                group: 'mark',
                parseDOM: [
                    {
                        tag: tag,
                        priority: constants_1.CUSTOM_MARK_PRIORITY,
                    },
                ],
                toDOM: function () { return [
                    tagName,
                    {
                        class: className,
                    },
                    0,
                ]; },
            };
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CustomMark.prototype, "icon", {
        // @ts-ignore
        get: function () {
            return this.customIcon;
        },
        enumerable: false,
        configurable: true
    });
    CustomMark.prototype.active = function (state) {
        return (0, utils_1.markActive)(state.schema.marks[this.name])(state);
    };
    CustomMark.prototype.onClick = function (state, dispatch) {
        (0, prosemirror_commands_1.toggleMark)(state.schema.marks[this.name])(state, dispatch);
    };
    return CustomMark;
}(types_1.Extension));
exports.default = CustomMark;
//# sourceMappingURL=custom-mark.js.map