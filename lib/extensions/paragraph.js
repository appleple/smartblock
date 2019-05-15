import * as React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faParagraph, faAlignLeft, faAlignCenter, faAlignRight } from '@fortawesome/fontawesome-free-solid';
import { setBlockType } from 'prosemirror-commands';
import { blockActive } from '../util';
import Button from '../components/Button';
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
                        tag: 'p'
                    }],
                attrs: {
                    align: { default: 'left' }
                },
                toDOM: function (node) {
                    return ["p", {
                            style: "text-align: " + node.attrs.align
                        }, 0];
                }
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Paragraph.prototype, "icon", {
        get: function () {
            return React.createElement(FontAwesomeIcon, { icon: faParagraph });
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
            React.createElement(Button, { onClick: function () {
                    setBlockType(state.schema.nodes.paragraph, {
                        align: 'left'
                    })(state, dispatch);
                } },
                React.createElement(FontAwesomeIcon, { icon: faAlignLeft })),
            React.createElement(Button, { onClick: function () {
                    setBlockType(state.schema.nodes.paragraph, {
                        align: 'center'
                    })(state, dispatch);
                } },
                React.createElement(FontAwesomeIcon, { icon: faAlignCenter })),
            React.createElement(Button, { onClick: function () {
                    setBlockType(state.schema.nodes.paragraph, {
                        align: 'right'
                    })(state, dispatch);
                } },
                React.createElement(FontAwesomeIcon, { icon: faAlignRight }))));
    };
    Paragraph.prototype.onClick = function (state, dispatch) {
        setBlockType(state.schema.nodes.paragraph)(state, dispatch);
    };
    return Paragraph;
}());
export default Paragraph;
//# sourceMappingURL=paragraph.js.map