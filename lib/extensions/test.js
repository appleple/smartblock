"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var uuid_1 = require("uuid");
var prosemirror_commands_1 = require("prosemirror-commands");
var styled_components_1 = require("styled-components");
var utils_1 = require("../utils");
var button_1 = require("../components/button");
var Image_1 = require("../components/icons/Image");
var Full_1 = require("../components/icons/Full");
var Center_1 = require("../components/icons/Center");
var MediaMenu = styled_components_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  position: absolute;\n"], ["\n  position: absolute;\n"])));
var Test = /** @class */ (function () {
    function Test() {
    }
    Object.defineProperty(Test.prototype, "name", {
        get: function () {
            return 'media';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Test.prototype, "showMenu", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Test.prototype, "group", {
        get: function () {
            return 'block';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Test.prototype, "hideMenuOnFocus", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Test.prototype, "schema", {
        get: function () {
            return {
                content: 'inline*',
                group: 'block',
                selectable: true,
                attrs: {
                    src: { default: '' },
                    media_id: { default: '' },
                    size: { default: 'full' },
                    id: { default: '' }
                },
                parseDOM: [
                    {
                        tag: 'img',
                        getAttrs: function (dom) {
                            return {
                                src: dom.getAttribute('src'),
                                id: dom.getAttribute('id'),
                                media_id: dom.getAttribute('data-media_id')
                            };
                        }
                    }
                ],
                toDOM: function (node) {
                    return [
                        'figure',
                        {
                            contenteditable: true,
                            class: 'media'
                        },
                        [
                            'img',
                            {
                                src: node.attrs.src,
                                size: node.attrs.size,
                                id: node.attrs.id || uuid_1.default(),
                                'data-media_id': node.attrs.media_id
                            }
                        ],
                        ['p', { class: 'caption' }, 0]
                    ];
                }
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Test.prototype, "icon", {
        get: function () {
            return React.createElement(Image_1.default, { style: { width: '24px', height: '24px' } });
        },
        enumerable: true,
        configurable: true
    });
    Test.prototype.active = function (state) {
        return utils_1.blockActive(state.schema.nodes.media)(state);
    };
    Test.prototype.enable = function (state) {
        return prosemirror_commands_1.setBlockType(state.schema.nodes.media)(state);
    };
    Test.prototype.customLayout = function (_a, dom) {
        var state = _a.state, dispatch = _a.dispatch;
        var offsetHeight = dom.offsetHeight, offsetWidth = dom.offsetWidth;
        var style = {
            top: offsetHeight - 70 + "px",
            left: offsetWidth - 100 + "px",
            width: '200px'
        };
        var node = utils_1.findSelectedNodeWithType(state.schema.nodes.media, state);
        return (React.createElement(MediaMenu, { style: style },
            React.createElement(button_1.default, { type: "button", onClick: function () {
                    var attr = Object.assign({}, node.attrs, {
                        size: 'full'
                    });
                    prosemirror_commands_1.setBlockType(state.schema.nodes.media, attr)(state, dispatch);
                } },
                React.createElement(Full_1.default, null)),
            React.createElement(button_1.default, { type: "button", onClick: function () {
                    var attr = Object.assign({}, node.attrs, {
                        size: 'small'
                    });
                    prosemirror_commands_1.setBlockType(state.schema.nodes.media, attr)(state, dispatch);
                } },
                React.createElement(Center_1.default, null))));
    };
    return Test;
}());
exports.default = Test;
var templateObject_1;
//# sourceMappingURL=test.js.map