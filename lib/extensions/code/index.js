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
import { setBlockType } from 'prosemirror-commands';
import uuid from 'uuid';
import { Extension } from '../../types';
import CodeBlockView from './code-block-view';
import { blockActive } from '../../utils';
var Code = /** @class */ (function (_super) {
    __extends(Code, _super);
    function Code(props) {
        return _super.call(this, props) || this;
    }
    Object.defineProperty(Code.prototype, "name", {
        get: function () {
            return 'code';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Code.prototype, "group", {
        get: function () {
            return 'block';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Code.prototype, "showMenu", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Code.prototype, "schema", {
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
                        tag: 'code',
                        getAttrs: function (dom) {
                            return {
                                id: dom.getAttribute('id') || uuid(),
                                text: dom.textContent,
                            };
                        }
                    }
                ],
                toDOM: function (node) {
                    return [
                        'pre',
                        {
                            id: node.attrs.id || uuid(),
                            className: _this.className
                        },
                        ['code', 0]
                    ];
                },
                attrs: {
                    id: { default: '' },
                    text: { default: '' }
                }
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Code.prototype, "icon", {
        get: function () {
            return 'C';
        },
        enumerable: true,
        configurable: true
    });
    Code.prototype.active = function (state) {
        return blockActive(state.schema.nodes.code)(state);
    };
    Code.prototype.enable = function (state) {
        return setBlockType(state.schema.nodes.code)(state);
    };
    Code.prototype.onClick = function (state, dispatch) {
        setBlockType(state.schema.nodes.code)(state, dispatch);
    };
    Code.prototype.view = function (node, view, getPos) {
        return new CodeBlockView(node, view, getPos);
    };
    return Code;
}(Extension));
export default Code;
//# sourceMappingURL=index.js.map