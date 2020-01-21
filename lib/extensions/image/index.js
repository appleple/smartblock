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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var image_icon_1 = require("./image-icon");
var utils_1 = require("../../utils");
var types_1 = require("../../types");
var prosemirror_commands_1 = require("prosemirror-commands");
var plugins_1 = require("./plugins");
var util_1 = require("./util");
var button_1 = require("../../components/button");
var full_icon_1 = require("./full-icon");
var center_icon_1 = require("./center-icon");
var image_plus_icon_1 = require("./image-plus-icon");
var Image = /** @class */ (function (_super) {
    __extends(Image, _super);
    function Image(props) {
        var _this = _super.call(this, props) || this;
        _this.withCaption = true;
        _this.onChange = function (preview) { return Promise.resolve(preview); };
        if (!props) {
            return _this;
        }
        _this.imgClassName = props.imgClassName ? props.imgClassName : _this.imgClassName;
        _this.imgFullClassName = props.imgFullClassName ? props.imgFullClassName : _this.imgFullClassName;
        _this.captionClassName = props.captionClassName ? props.captionClassName : _this.captionClassName;
        _this.withCaption = props.withCaption ? props.withCaption : _this.withCaption;
        _this.onChange = props.onChange ? props.onChange : _this.onChange;
        return _this;
    }
    Object.defineProperty(Image.prototype, "name", {
        get: function () {
            return "image";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Image.prototype, "showMenu", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Image.prototype, "group", {
        get: function () {
            return "block";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Image.prototype, "hideBlockMenuOnFocus", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Image.prototype, "schema", {
        get: function () {
            var _this = this;
            var imgClassName = this.imgClassName;
            return {
                content: "inline*",
                isolating: true,
                group: "block",
                selectable: true,
                attrs: {
                    src: { default: "" },
                    size: { default: "" },
                    id: { default: "" },
                    caption: { default: "" }
                },
                parseDOM: [
                    {
                        tag: "figure",
                        getAttrs: function (dom) {
                            var img = dom.querySelector("img");
                            if (!img) {
                                return {};
                            }
                            return {
                                src: img.getAttribute("src"),
                                id: img.getAttribute("id"),
                                size: util_1.hasClass(img, imgClassName) ? 'small' : 'full'
                            };
                        }
                    },
                    {
                        tag: "img",
                        getAttrs: function (dom) {
                            return {
                                src: dom.getAttribute("src"),
                                id: dom.getAttribute("id"),
                                size: util_1.hasClass(dom, imgClassName) ? 'small' : 'full'
                            };
                        }
                    }
                ],
                toDOM: function (node) {
                    if (!_this.withCaption) {
                        return ["img", {
                                src: node.attrs.src,
                                "class": node.attrs.size === "full" ? _this.imgFullClassName : _this.imgClassName,
                            }];
                    }
                    return [
                        "figure",
                        {
                            "class": _this.className,
                        }, ["img", {
                                src: node.attrs.src,
                                "class": node.attrs.size === "full" ? _this.imgFullClassName : _this.imgClassName,
                            }],
                        ["figcaption", { "class": _this.captionClassName }, 0],
                    ];
                }
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Image.prototype, "icon", {
        get: function () {
            return React.createElement(image_icon_1.default, { style: { width: "24px", height: "24px" } });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Image.prototype, "plugins", {
        get: function () {
            return [plugins_1.MediaPlugin()];
        },
        enumerable: true,
        configurable: true
    });
    Image.prototype.changeImage = function (state, dispatch, files) {
        return __awaiter(this, void 0, void 0, function () {
            var items, item, success;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, util_1.readFiles(files)];
                    case 1:
                        items = _a.sent();
                        item = items[0];
                        if (!item) {
                            return [2 /*return*/];
                        }
                        if (!this.onChange) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.onChange(item.preview, item.file)];
                    case 2:
                        success = _a.sent();
                        if (success) {
                            prosemirror_commands_1.setBlockType(state.schema.nodes.image, {
                                src: success
                            })(state, dispatch);
                        }
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Image.prototype.customButton = function (_a) {
        var _this = this;
        var state = _a.state, dispatch = _a.dispatch;
        var disabled = (this.enable && !this.enable(state)) || this.hideMenuOnFocus;
        return (React.createElement(button_1.default, { tag: "label", active: this.active && this.active(state), disabled: disabled },
            this.icon,
            !disabled && React.createElement("input", { type: "file", style: { display: 'none' }, onChange: function (e) {
                    _this.changeImage(state, dispatch, e.target.files);
                } })));
    };
    Image.prototype.customMenu = function (_a) {
        var _this = this;
        var state = _a.state, dispatch = _a.dispatch;
        var node = utils_1.findSelectedNodeWithType(state.schema.nodes.image, state);
        return (React.createElement(React.Fragment, null,
            React.createElement(button_1.default, { type: "button", style: {
                    marginRight: '1px',
                    borderTopRightRadius: '0',
                    borderBottomRightRadius: '0',
                    opacity: node.attrs.size !== 'small' ? '.6' : '1'
                }, onClick: function () {
                    var attr = Object.assign({}, node.attrs, {
                        size: 'full'
                    });
                    prosemirror_commands_1.setBlockType(state.schema.nodes.media, attr)(state, dispatch);
                } },
                React.createElement(full_icon_1.default, { style: { width: '24px', height: '24px' } })),
            React.createElement(button_1.default, { type: "button", style: {
                    borderTopLeftRadius: '0',
                    borderBottomLeftRadius: '0',
                    opacity: node.attrs.size === 'small' ? '.6' : '1',
                }, onClick: function () {
                    var attr = Object.assign({}, node.attrs, {
                        size: 'small'
                    });
                    prosemirror_commands_1.setBlockType(state.schema.nodes.media, attr)(state, dispatch);
                } },
                React.createElement(center_icon_1.default, { style: { width: '24px', height: '24px' } })),
            React.createElement(button_1.default, { tag: "label" },
                React.createElement(image_plus_icon_1.default, { style: { width: '24px', height: '24px' } }),
                React.createElement("input", { type: "file", style: { display: 'none' }, onChange: function (e) {
                        _this.changeImage(state, dispatch, e.target.files);
                    } }))));
    };
    Image.prototype.active = function (state) {
        return utils_1.blockActive(state.schema.nodes.image)(state);
    };
    Image.prototype.enable = function (state) {
        return prosemirror_commands_1.setBlockType(state.schema.nodes.image)(state);
    };
    return Image;
}(types_1.Extension));
exports.default = Image;
//# sourceMappingURL=index.js.map