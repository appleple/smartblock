import * as React from 'react';
import { setBlockType } from 'prosemirror-commands';
import uuid from 'uuid';
import BlockQuoteIcon from '../components/icons/Blockquote';
import { blockActive } from '../utils';
var BlockQuote = /** @class */ (function () {
    function BlockQuote() {
    }
    Object.defineProperty(BlockQuote.prototype, "name", {
        get: function () {
            return 'blockquote';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BlockQuote.prototype, "group", {
        get: function () {
            return 'block';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BlockQuote.prototype, "showMenu", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BlockQuote.prototype, "schema", {
        get: function () {
            return {
                content: 'inline*',
                group: 'block',
                parseDOM: [
                    {
                        tag: 'blockquote',
                        getAttrs: function (dom) {
                            return {
                                id: dom.getAttribute('id') || uuid()
                            };
                        }
                    }
                ],
                attrs: {
                    align: { default: 'left' },
                    id: { default: '' }
                },
                toDOM: function (node) {
                    return [
                        'blockquote',
                        {
                            id: node.attrs.id || uuid()
                        },
                        0
                    ];
                }
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BlockQuote.prototype, "icon", {
        get: function () {
            return React.createElement(BlockQuoteIcon, { style: { width: '24px', height: '24px' } });
        },
        enumerable: true,
        configurable: true
    });
    BlockQuote.prototype.active = function (state) {
        return blockActive(state.schema.nodes.blockquote)(state);
    };
    BlockQuote.prototype.enable = function (state) {
        return setBlockType(state.schema.nodes.blockquote)(state);
    };
    BlockQuote.prototype.onClick = function (state, dispatch) {
        setBlockType(state.schema.nodes.blockquote)(state, dispatch);
    };
    return BlockQuote;
}());
export default BlockQuote;
//# sourceMappingURL=blockquote.js.map