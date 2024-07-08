"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Extension = void 0;
var Extension = /** @class */ (function () {
    function Extension(props) {
        if (props) {
            this.className = props.className;
            this.customSchema = props.schema;
            this.tagName = props.tagName;
            this.customIcon = props.icon;
            this.customName = props.customName;
        }
    }
    return Extension;
}());
exports.Extension = Extension;
//# sourceMappingURL=index.js.map