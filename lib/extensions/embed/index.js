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
var react_dom_1 = require("react-dom");
var prosemirror_commands_1 = require("prosemirror-commands");
var types_1 = require("../../types");
var utils_1 = require("../../utils");
var link_1 = require("../../components/icons/link");
var popup_1 = require("./popup");
var plugin_1 = require("./plugin");
var Embed = /** @class */ (function (_super) {
    __extends(Embed, _super);
    function Embed(props) {
        return _super.call(this, props) || this;
    }
    Object.defineProperty(Embed.prototype, "name", {
        // @ts-ignore
        get: function () {
            return 'embed';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Embed.prototype, "group", {
        // @ts-ignore
        get: function () {
            return 'block';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Embed.prototype, "showMenu", {
        // @ts-ignore
        get: function () {
            return true;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Embed.prototype, "hideInlineMenuOnFocus", {
        // @ts-ignore
        get: function () {
            return true;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Embed.prototype, "schema", {
        // @ts-ignore
        get: function () {
            if (this.customSchema) {
                return this.customSchema;
            }
            return {
                group: 'block',
                content: 'text*',
                selectable: true,
                isolating: true,
                attrs: {
                    type: { default: 'youtube' },
                    src: { default: '' }
                },
                parseDOM: [
                    {
                        tag: 'iframe',
                        getAttrs: function (dom) {
                            return {
                                src: dom.getAttribute('src')
                            };
                        }
                    },
                    {
                        tag: 'div.embed-wrap',
                        getAttrs: function (dom) {
                            var a = dom.querySelector('a');
                            return { src: a.getAttribute('href') };
                        }
                    }
                ],
                toDOM: function (node) {
                    if (node.attrs.src.indexOf('youtube') !== -1) {
                        var src = node.attrs.src;
                        var youtubeId = '';
                        var matches = /www\.youtube\.com\/watch\?v=(.*?)$/.exec(src);
                        if (matches && matches[1]) {
                            youtubeId = matches[1];
                        }
                        if (!youtubeId) {
                            var embedMatches = /www\.youtube\.com\/embed\/(.*?)$/.exec(src);
                            if (embedMatches && embedMatches[1]) {
                                youtubeId = embedMatches[1];
                            }
                        }
                        if (youtubeId) {
                            var url = "https://www.youtube.com/embed/".concat(youtubeId);
                            return [
                                'div',
                                {
                                    contenteditable: true,
                                    class: 'youtube-frame-wrap'
                                },
                                [
                                    'div',
                                    {
                                        class: 'youtube-frame'
                                    },
                                    [
                                        'iframe',
                                        {
                                            src: url
                                        }
                                    ]
                                ]
                            ];
                        }
                    }
                    return [
                        'div',
                        {
                            class: 'embed-wrap'
                        },
                        [
                            'a',
                            {
                                class: 'embed',
                                href: node.attrs.src
                            },
                            [
                                'div',
                                {
                                    class: 'embed-inner'
                                },
                                0
                            ]
                        ]
                    ];
                }
            };
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Embed.prototype, "icon", {
        // @ts-ignore
        get: function () {
            return React.createElement(link_1.default, { style: { width: '24px', height: '24px' } });
        },
        enumerable: false,
        configurable: true
    });
    Embed.prototype.active = function (state) {
        return (0, utils_1.blockActive)(state.schema.nodes.embed)(state);
    };
    Embed.prototype.enable = function (state) {
        return (0, prosemirror_commands_1.setBlockType)(state.schema.nodes.embed)(state);
    };
    Embed.prototype.onClick = function (state, dispatch) {
        var div = document.createElement('div');
        document.body.appendChild(div);
        (0, react_dom_1.render)(React.createElement(popup_1.default, { onClose: function () {
                (0, react_dom_1.unmountComponentAtNode)(div);
            }, onDone: function (src) {
                var pos = state.selection.$anchor.pos;
                var text = state.schema.text(src);
                var node = state.schema.nodes.embed.createAndFill({
                    src: src
                }, text);
                dispatch(state.tr.insert(pos, node));
                (0, react_dom_1.unmountComponentAtNode)(div);
            } }), div);
    };
    Object.defineProperty(Embed.prototype, "plugins", {
        // @ts-ignore
        get: function () {
            return [(0, plugin_1.default)()];
        },
        enumerable: false,
        configurable: true
    });
    return Embed;
}(types_1.Extension));
exports.default = Embed;
//# sourceMappingURL=index.js.map