"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unmount = exports.render = void 0;
var ReactDOM = require("react-dom");
var client_1 = require("react-dom/client");
var isReact18 = parseInt(ReactDOM.version.split('.')[0], 10) >= 18;
function render(element, container) {
    if (isReact18) {
        if (!container._reactRoot) {
            container._reactRoot = (0, client_1.createRoot)(container);
        }
        container._reactRoot.render(element);
    }
    else {
        ReactDOM.render(element, container);
    }
}
exports.render = render;
function unmount(container) {
    if (isReact18 && container._reactRoot) {
        container._reactRoot.unmount();
        container._reactRoot = null;
    }
    else {
        ReactDOM.unmountComponentAtNode(container);
    }
}
exports.unmount = unmount;
//# sourceMappingURL=react.js.map