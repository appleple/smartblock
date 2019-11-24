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
import { getParentNodeFromState } from '../../utils';
import { Extension } from '../../types';
import { blockActive } from '../../utils';
import Plugin from './plugin';
import Button from '../../components/button';
import CodeIcon from '../../components/icons/Code';
var Code = /** @class */ (function (_super) {
    __extends(Code, _super);
    function Code(props) {
        var _this = _super.call(this, props) || this;
        _this.defaultLang = 'js';
        _this.langs = [
            {
                label: '<span style="font-size: 12px;">JS</span>',
                lang: 'js'
            },
            {
                label: '<span style="font-size: 12px;">PHP</span>',
                lang: 'php'
            },
            {
                label: '<span style="font-size: 12px;">XML</span>',
                lang: 'xml'
            },
            {
                label: '<span style="font-size: 12px;">CSS</span>',
                lang: 'css'
            }
        ];
        if (props) {
            _this.langs = props.langs;
        }
        return _this;
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
    Object.defineProperty(Code.prototype, "hideInlineMenuOnFocus", {
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
            var defaultLang = this.defaultLang;
            return {
                content: 'inline*',
                group: 'block',
                parseDOM: [
                    {
                        tag: 'code',
                        getAttrs: function (dom) {
                            return {
                                id: dom.getAttribute('id') || uuid()
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
                    id: {
                        default: ''
                    },
                    lang: {
                        default: defaultLang
                    }
                }
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Code.prototype, "icon", {
        get: function () {
            return React.createElement(CodeIcon, { style: { width: '24px', height: '24px' } });
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
    Code.prototype.customMenu = function (_a) {
        var state = _a.state, dispatch = _a.dispatch;
        var node = getParentNodeFromState(state);
        var langs = this.langs;
        return (React.createElement(React.Fragment, null, langs.map(function (lang) { return (React.createElement(Button, { active: node && node.attrs.lang === lang.lang, type: "button", onClick: function () {
                setBlockType(state.schema.nodes.code, {
                    lang: lang.lang
                })(state, dispatch);
            } }, typeof lang.label !== 'string' ? (lang.label) : (React.createElement("span", { dangerouslySetInnerHTML: { __html: lang.label } })))); })));
    };
    Object.defineProperty(Code.prototype, "plugins", {
        get: function () {
            return [
                Plugin({
                    name: 'code'
                })
            ];
        },
        enumerable: true,
        configurable: true
    });
    return Code;
}(Extension));
export default Code;
//# sourceMappingURL=index.js.map