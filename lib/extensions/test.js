var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import * as React from 'react';
import uuid from 'uuid';
import { setBlockType } from 'prosemirror-commands';
import styled from 'styled-components';
import { blockActive, findSelectedNodeWithType } from '../utils';
import Button from '../components/button';
import ImageIcon from '../components/icons/Image';
import FullIcon from '../components/icons/Full';
import CenterIcon from '../components/icons/Center';
var MediaMenu = styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  position: absolute;\n"], ["\n  position: absolute;\n"])));
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
                                id: node.attrs.id || uuid(),
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
            return React.createElement(ImageIcon, { style: { width: '24px', height: '24px' } });
        },
        enumerable: true,
        configurable: true
    });
    Test.prototype.active = function (state) {
        return blockActive(state.schema.nodes.media)(state);
    };
    Test.prototype.enable = function (state) {
        return setBlockType(state.schema.nodes.media)(state);
    };
    Test.prototype.customLayout = function (_a, dom) {
        var state = _a.state, dispatch = _a.dispatch;
        var offsetHeight = dom.offsetHeight, offsetWidth = dom.offsetWidth;
        var style = {
            top: offsetHeight - 70 + "px",
            left: offsetWidth - 100 + "px",
            width: '200px'
        };
        var node = findSelectedNodeWithType(state.schema.nodes.media, state);
        return (React.createElement(MediaMenu, { style: style },
            React.createElement(Button, { type: "button", onClick: function () {
                    var attr = Object.assign({}, node.attrs, {
                        size: 'full'
                    });
                    setBlockType(state.schema.nodes.media, attr)(state, dispatch);
                } },
                React.createElement(FullIcon, null)),
            React.createElement(Button, { type: "button", onClick: function () {
                    var attr = Object.assign({}, node.attrs, {
                        size: 'small'
                    });
                    setBlockType(state.schema.nodes.media, attr)(state, dispatch);
                } },
                React.createElement(CenterIcon, null))));
    };
    return Test;
}());
export default Test;
var templateObject_1;
//# sourceMappingURL=test.js.map