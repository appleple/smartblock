"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var prosemirror_commands_1 = require("prosemirror-commands");
var uuid = require("uuid/v4");
var utils_1 = require("../../utils");
var types_1 = require("../../types");
var utils_2 = require("../../utils");
var plugin_1 = require("./plugin");
var button_1 = require("../../components/button");
var code_1 = require("../../components/icons/code");
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
        // @ts-ignore
        get: function () {
            return 'code';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Code.prototype, "group", {
        // @ts-ignore
        get: function () {
            return 'block';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Code.prototype, "showMenu", {
        // @ts-ignore
        get: function () {
            return true;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Code.prototype, "hideInlineMenuOnFocus", {
        // @ts-ignore
        get: function () {
            return true;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Code.prototype, "schema", {
        // @ts-ignore
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
                            dom.innerHTML = dom.innerHTML.replace(/\n/g, '<br/>');
                            return {
                                id: dom.getAttribute('id') || uuid(),
                                lang: dom.getAttribute('class') ? dom.getAttribute('class') : defaultLang
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
                        ['code', {
                                class: node.attrs.lang
                            }, 0]
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
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Code.prototype, "icon", {
        // @ts-ignore
        get: function () {
            return React.createElement(code_1.default, { style: { width: '24px', height: '24px' } });
        },
        enumerable: false,
        configurable: true
    });
    Code.prototype.active = function (state) {
        return (0, utils_2.blockActive)(state.schema.nodes.code)(state);
    };
    Code.prototype.enable = function (state) {
        return (0, prosemirror_commands_1.setBlockType)(state.schema.nodes.code)(state);
    };
    Code.prototype.onClick = function (state, dispatch) {
        (0, prosemirror_commands_1.setBlockType)(state.schema.nodes.code)(state, dispatch);
    };
    Code.prototype.customMenu = function (_a) {
        var state = _a.state, dispatch = _a.dispatch;
        var node = (0, utils_1.getParentNodeFromState)(state);
        var langs = this.langs;
        return (React.createElement(React.Fragment, null, langs.map(function (lang) { return (React.createElement(button_1.default, { active: node && node.attrs.lang === lang.lang, type: "button", onClick: function () {
                (0, prosemirror_commands_1.setBlockType)(state.schema.nodes.code, {
                    lang: lang.lang
                })(state, dispatch);
            } }, typeof lang.label !== 'string' ? (lang.label) : (React.createElement("span", { dangerouslySetInnerHTML: { __html: lang.label } })))); })));
    };
    Object.defineProperty(Code.prototype, "plugins", {
        // @ts-ignore
        get: function () {
            return [
                (0, plugin_1.default)({
                    name: 'code'
                })
            ];
        },
        enumerable: false,
        configurable: true
    });
    return Code;
}(types_1.Extension));
exports.default = Code;
//# sourceMappingURL=index.js.map