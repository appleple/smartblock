"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ReactDOM = require("react-dom");
var styled_components_1 = require("styled-components");
var editor_1 = require("./editor");
var inline_menu_1 = require("./inline-menu");
var menu_1 = require("./menu");
var plugins_1 = require("./config/plugins");
require("./styles/base.css");
var prosemirror_model_1 = require("prosemirror-model");
var prosemirror_keymap_1 = require("prosemirror-keymap");
var keys_1 = require("./config/keys");
var prosemirror_model_2 = require("prosemirror-model");
var prosemirror_commands_1 = require("prosemirror-commands");
var scroll_to_1 = require("scroll-to");
var util_1 = require("./util");
var extensions_1 = require("./extensions");
var Input = styled_components_1.default('div')(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  width: 100%;\n  overflow-y: auto;\n"], ["\n  width: 100%;\n  overflow-y: auto;\n"])));
var Container = styled_components_1.default.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  max-width: 780px;\n  margin: 0 auto;\n  position: relative;\n  padding: 10px 0 80px 0;\n"], ["\n  max-width: 780px;\n  margin: 0 auto;\n  position: relative;\n  padding: 10px 0 80px 0;\n"])));
var App = /** @class */ (function (_super) {
    __extends(App, _super);
    function App(props) {
        var _this = _super.call(this, props) || this;
        var html = props.html, json = props.json, extensions = props.extensions;
        var schema = _this.getSchemaFromExtensions(extensions);
        _this.schema = schema;
        var realHtml = html;
        if (json) {
            var node = prosemirror_model_2.Node.fromJSON(_this.schema, json);
            realHtml = _this.getHtmlFromNode(node, schema);
        }
        var div = document.createElement('div');
        div.innerHTML = realHtml;
        var doc = prosemirror_model_2.DOMParser.fromSchema(_this.schema).parse(div);
        _this.state = { doc: doc };
        return _this;
    }
    App.prototype.getBlockSchemas = function (extensions) {
        var nodesSchema = this.getBlocks(extensions);
        var nodes = nodesSchema.reduce(function (node, curr, index) {
            var _a;
            var newNode = (_a = {}, _a[curr.name] = __assign({}, curr.schema), _a);
            return __assign({}, node, newNode);
        }, {});
        return nodes;
    };
    App.prototype.getBlocks = function (extensions) {
        var nodesSchema = extensions.filter(function (extension) {
            if (extension.schema.group === 'block') {
                return true;
            }
            return false;
        });
        return nodesSchema;
    };
    App.prototype.getMarkSchemas = function (extensions) {
        var marksSchema = this.getMarks(extensions);
        var marks = marksSchema.reduce(function (mark, curr, index) {
            var _a;
            var newMark = (_a = {}, _a[curr.name] = __assign({}, curr.schema), _a);
            return __assign({}, mark, newMark);
        }, {});
        return marks;
    };
    App.prototype.getMarks = function (extensions) {
        var marksSchema = extensions.filter(function (extension) {
            if (extension.schema.group === 'mark') {
                return true;
            }
            return false;
        });
        return marksSchema;
    };
    App.prototype.getSchemaFromExtensions = function (extensions) {
        var nodes = this.getBlockSchemas(extensions);
        var base = {
            doc: {
                content: 'block+'
            },
            text: {
                group: 'inline'
            },
            hard_break: {
                inline: true,
                group: "inline",
                selectable: false,
                parseDOM: [{ tag: "br" }],
                toDOM: function () { return ['br']; }
            }
        };
        nodes = __assign({}, nodes, base);
        var marks = this.getMarkSchemas(extensions);
        return new prosemirror_model_1.Schema({ nodes: nodes, marks: marks });
    };
    App.prototype.getHtmlFromNode = function (doc, schema) {
        var fragment = prosemirror_model_2.DOMSerializer.fromSchema(schema).serializeFragment(doc.content);
        var div = document.createElement('div');
        div.appendChild(fragment);
        return div.innerHTML;
    };
    App.prototype.getKeys = function (extensions) {
        var _this = this;
        var extensionKeys = {};
        extensions.forEach(function (extension) {
            if (extension.keys) {
                extensionKeys = __assign({}, extensionKeys, extension.keys(_this.schema));
            }
        });
        Object.keys(keys_1.default).forEach(function (key) {
            if (extensionKeys[key]) {
                extensionKeys[key] = prosemirror_commands_1.chainCommands(extensionKeys[key], keys_1.default[key]);
            }
            else {
                extensionKeys[key] = keys_1.default[key];
            }
        });
        return prosemirror_keymap_1.keymap(extensionKeys);
    };
    App.prototype.getPlugins = function () {
        var extensions = this.props.extensions;
        var customPlugins = [];
        extensions.forEach(function (extension) {
            if (extension.plugins) {
                customPlugins = customPlugins.concat(extension.plugins);
            }
        });
        var keyPlugin = this.getKeys(extensions);
        return plugins_1.default.concat(customPlugins, [keyPlugin]);
    };
    App.prototype.getNodeViews = function () {
        var extensions = this.props.extensions;
        var views = {};
        extensions.forEach(function (extension) {
            if (extension.render) {
                views[extension.name] = function (node, view, getPos) {
                    var dom = document.createElement('div');
                    setTimeout(function () {
                        ReactDOM.render(React.createElement(React.Fragment, null, extension.render(node)), dom);
                    }, 100);
                    return {
                        dom: dom
                    };
                };
            }
        });
        return views;
    };
    App.prototype.getMenu = function (extensions) {
        return extensions.filter(function (extension) { return extension.showMenu; });
    };
    App.prototype.render = function () {
        var _this = this;
        var extensions = this.props.extensions;
        var doc = this.state.doc;
        var schema = this.schema;
        var editorOptions = { schema: schema, plugins: this.getPlugins(), doc: doc };
        var blocks = this.getBlocks(extensions);
        var marks = this.getMarks(extensions);
        var nodeViews = this.getNodeViews();
        return (React.createElement(Container, { id: "container", ref: function (ref) { return _this.container = ref; } },
            React.createElement(Input, null,
                React.createElement(editor_1.default, { options: editorOptions, nodeViews: nodeViews, onChange: function (doc) {
                        var selected = _this.container.querySelector('.selected');
                        if (selected) {
                            var viewport = util_1.getViewport();
                            var top_1 = util_1.getScrollTop() + viewport.height;
                            var offsetTop = util_1.getOffset(selected).top;
                            var height = selected.offsetHeight;
                            if (offsetTop + height + 80 >= top_1) {
                                if (/iPod|iPhone|iPad/.test(navigator.platform) && document.activeElement) {
                                    var activeElement = document.activeElement;
                                    if (activeElement.isContentEditable) {
                                        scroll_to_1.default(0, offsetTop);
                                    }
                                }
                                else {
                                    scroll_to_1.default(0, offsetTop + height + 80);
                                }
                            }
                        }
                        if (_this.props.onChange) {
                            var json = doc.toJSON();
                            var html = _this.getHtmlFromNode(doc, _this.schema);
                            _this.props.onChange({
                                json: json, html: html
                            });
                        }
                    }, render: function (_a) {
                        var editor = _a.editor, view = _a.view;
                        return (React.createElement(React.Fragment, null,
                            React.createElement(menu_1.default, { view: view, menu: { blocks: _this.getMenu(blocks) } }),
                            React.createElement(inline_menu_1.default, { menu: { marks: _this.getMenu(marks) }, view: view }),
                            editor));
                    } }))));
    };
    App.defaultProps = {
        extensions: extensions_1.default
    };
    return App;
}(React.Component));
exports.default = App;
var templateObject_1, templateObject_2;
//# sourceMappingURL=index.js.map