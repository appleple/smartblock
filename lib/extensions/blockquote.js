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
import { setBlockType } from 'prosemirror-commands';
import uuid from 'uuid';
import BlockQuoteIcon from '../components/icons/Blockquote';
import { Extension } from '../types';
import { blockActive } from '../utils';
var BlockQuote = /** @class */ (function (_super) {
    __extends(BlockQuote, _super);
    function BlockQuote(props) {
        return _super.call(this, props) || this;
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
            var _this = this;
            if (this.customSchema) {
                return this.customSchema;
            }
            return {
                content: 'inline*',
                group: 'block',
                parseDOM: [
                    {
                        tag: 'blockquote',
                        getAttrs: function (dom) {
                            var attr = {
                                id: dom.getAttribute('id') || uuid()
                            };
                            if (dom.style.textAlign) {
                                attr['align'] = dom.style.textAlign;
                            }
                            return attr;
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
                            id: node.attrs.id || uuid(),
                            class: _this.className
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
}(Extension));
export default BlockQuote;
//# sourceMappingURL=blockquote.js.map