"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var prosemirror_commands_1 = require("prosemirror-commands");
var uuid = require("uuid/v4");
var utils_1 = require("../../utils");
var types_1 = require("../../types");
var utils_2 = require("../../utils");
var plugin_1 = require("./plugin");
var button_1 = require("../../components/button");
var Code_1 = require("../../components/icons/Code");
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
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Code.prototype, "icon", {
        get: function () {
            return React.createElement(Code_1.default, { style: { width: '24px', height: '24px' } });
        },
        enumerable: true,
        configurable: true
    });
    Code.prototype.active = function (state) {
        return utils_2.blockActive(state.schema.nodes.code)(state);
    };
    Code.prototype.enable = function (state) {
        return prosemirror_commands_1.setBlockType(state.schema.nodes.code)(state);
    };
    Code.prototype.onClick = function (state, dispatch) {
        prosemirror_commands_1.setBlockType(state.schema.nodes.code)(state, dispatch);
    };
    Code.prototype.customMenu = function (_a) {
        var state = _a.state, dispatch = _a.dispatch;
        var node = utils_1.getParentNodeFromState(state);
        var langs = this.langs;
        return (React.createElement(React.Fragment, null, langs.map(function (lang) { return (React.createElement(button_1.default, { active: node && node.attrs.lang === lang.lang, type: "button", onClick: function () {
                prosemirror_commands_1.setBlockType(state.schema.nodes.code, {
                    lang: lang.lang
                })(state, dispatch);
            } }, typeof lang.label !== 'string' ? (lang.label) : (React.createElement("span", { dangerouslySetInnerHTML: { __html: lang.label } })))); })));
    };
    Object.defineProperty(Code.prototype, "plugins", {
        get: function () {
            return [
                plugin_1.default({
                    name: 'code'
                })
            ];
        },
        enumerable: true,
        configurable: true
    });
    return Code;
}(types_1.Extension));
exports.default = Code;
//# sourceMappingURL=index.js.map