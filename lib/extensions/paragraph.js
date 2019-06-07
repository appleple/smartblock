import * as React from 'react';
import ParagraphIcon from '../components/icons/Paragraph';
import AlignLeftIcon from '../components/icons/AlignLeft';
import AlignCenterIcon from '../components/icons/AlignCenter';
import AlignRightIcon from '../components/icons/AlignRight';
import { setBlockType } from 'prosemirror-commands';
import uuid from 'uuid';
import { blockActive } from '../utils';
import Button from '../components/button';
var Paragraph = /** @class */ (function () {
    function Paragraph() {
    }
    Object.defineProperty(Paragraph.prototype, "name", {
        get: function () {
            return 'paragraph';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Paragraph.prototype, "group", {
        get: function () {
            return 'block';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Paragraph.prototype, "showMenu", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Paragraph.prototype, "schema", {
        get: function () {
            return {
                content: 'inline*',
                group: 'block',
                parseDOM: [{
                        tag: 'p', getAttrs: function (dom) {
                            return {
                                id: dom.getAttribute('id') || uuid()
                            };
                        }
                    }],
                attrs: {
                    align: { default: 'left' },
                    id: { default: '' }
                },
                toDOM: function (node) {
                    return ["p", {
                            style: "text-align: " + node.attrs.align,
                            tabindex: '1',
                            id: node.attrs.id || uuid()
                        }, 0];
                }
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Paragraph.prototype, "icon", {
        get: function () {
            return React.createElement(ParagraphIcon, { style: { width: '24px', height: '24px' } });
        },
        enumerable: true,
        configurable: true
    });
    Paragraph.prototype.active = function (state) {
        return blockActive(state.schema.nodes.paragraph)(state);
    };
    Paragraph.prototype.enable = function (state) {
        return setBlockType(state.schema.nodes.paragraph)(state);
    };
    Paragraph.prototype.customMenu = function (_a) {
        var state = _a.state, dispatch = _a.dispatch;
        return (React.createElement(React.Fragment, null,
            React.createElement(Button, { type: "button", onClick: function () {
                    setBlockType(state.schema.nodes.paragraph, {
                        align: 'left'
                    })(state, dispatch);
                } },
                React.createElement(AlignLeftIcon, { style: { width: '24px', height: '24px' } })),
            React.createElement(Button, { type: "button", onClick: function () {
                    setBlockType(state.schema.nodes.paragraph, {
                        align: 'center'
                    })(state, dispatch);
                } },
                React.createElement(AlignCenterIcon, { style: { width: '24px', height: '24px' } })),
            React.createElement(Button, { type: "button", onClick: function () {
                    setBlockType(state.schema.nodes.paragraph, {
                        align: 'right'
                    })(state, dispatch);
                } },
                React.createElement(AlignRightIcon, { style: { width: '24px', height: '24px' } }))));
    };
    Paragraph.prototype.onClick = function (state, dispatch) {
        setBlockType(state.schema.nodes.paragraph)(state, dispatch);
    };
    return Paragraph;
}());
export default Paragraph;
//# sourceMappingURL=paragraph.js.map