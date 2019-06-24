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
import { render, unmountComponentAtNode } from 'react-dom';
import { setBlockType } from 'prosemirror-commands';
import { Extension } from '../../types';
import { blockActive } from '../../utils';
import LinkIcon from '../../components/icons/Link';
import Popup from './popup';
var Embed = /** @class */ (function (_super) {
    __extends(Embed, _super);
    function Embed(schema) {
        var _this = _super.call(this) || this;
        _this.customSchema = schema;
        return _this;
    }
    Object.defineProperty(Embed.prototype, "name", {
        get: function () {
            return 'embed';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Embed.prototype, "group", {
        get: function () {
            return 'block';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Embed.prototype, "showMenu", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Embed.prototype, "schema", {
        get: function () {
            if (this.customSchema) {
                return this.customSchema;
            }
            return {
                group: 'block',
                content: 'inline*',
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
                        'tag': 'div.embed-wrap',
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
                            var url = "https://www.youtube.com/embed/" + youtubeId;
                            return ([
                                'div',
                                {
                                    contenteditable: true,
                                    'class': 'youtube-frame-wrap'
                                },
                                [
                                    'div',
                                    {
                                        'class': 'youtube-frame'
                                    },
                                    [
                                        'iframe',
                                        {
                                            src: url
                                        }
                                    ]
                                ]
                            ]);
                        }
                    }
                    return [
                        'div',
                        {
                            'class': 'embed-wrap'
                        },
                        [
                            'a',
                            {
                                'class': 'embed',
                                'href': node.attrs.src
                            },
                            [
                                'div',
                                {
                                    'class': 'embed-inner'
                                },
                                node.attrs.src
                            ]
                        ]
                    ];
                }
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Embed.prototype, "icon", {
        get: function () {
            return React.createElement(LinkIcon, { style: { width: '24px', height: '24px' } });
        },
        enumerable: true,
        configurable: true
    });
    Embed.prototype.active = function (state) {
        return blockActive(state.schema.nodes.embed)(state);
    };
    Embed.prototype.enable = function (state) {
        return setBlockType(state.schema.nodes.embed)(state);
    };
    Embed.prototype.onClick = function (state, dispatch) {
        var div = document.createElement('div');
        document.body.append(div);
        render(React.createElement(Popup, { onClose: function () {
                unmountComponentAtNode(div);
            }, onDone: function (src) {
                setBlockType(state.schema.nodes.embed, {
                    src: src
                })(state, dispatch);
                unmountComponentAtNode(div);
            } }), div);
    };
    return Embed;
}(Extension));
export default Embed;
//# sourceMappingURL=index.js.map