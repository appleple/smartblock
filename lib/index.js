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
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import styled from 'styled-components';
import Editor from './editor';
import InlineMenuBar from './inline-menu';
import PositionBtns from './menu';
import plugins from './config/plugins';
import { Schema } from 'prosemirror-model';
import { keymap } from 'prosemirror-keymap';
import keys from './config/keys';
import { Node, DOMParser, DOMSerializer } from 'prosemirror-model';
import { chainCommands } from 'prosemirror-commands';
import scrollTo from 'scroll-to';
import { getScrollTop, getOffset, getViewport } from './util';
import extensions from './extensions';
var Input = styled('div')(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  width: 100%;\n  overflow-y: auto;\n"], ["\n  width: 100%;\n  overflow-y: auto;\n"])));
var Container = styled.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  max-width: 780px;\n  margin: 0 auto;\n  position: relative;\n  padding: 10px 0 80px 0;\n"], ["\n  max-width: 780px;\n  margin: 0 auto;\n  position: relative;\n  padding: 10px 0 80px 0;\n"])));
var App = /** @class */ (function (_super) {
    __extends(App, _super);
    function App(props) {
        var _this = _super.call(this, props) || this;
        var html = props.html, json = props.json, extensions = props.extensions;
        var schema = _this.getSchemaFromExtensions(extensions);
        _this.schema = schema;
        var realHtml = html;
        if (json) {
            var node = Node.fromJSON(_this.schema, json);
            realHtml = _this.getHtmlFromNode(node, schema);
        }
        var div = document.createElement('div');
        div.innerHTML = realHtml;
        var doc = DOMParser.fromSchema(_this.schema).parse(div);
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
        return new Schema({ nodes: nodes, marks: marks });
    };
    App.prototype.getHtmlFromNode = function (doc, schema) {
        var fragment = DOMSerializer.fromSchema(schema).serializeFragment(doc.content);
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
        Object.keys(keys).forEach(function (key) {
            if (extensionKeys[key]) {
                extensionKeys[key] = chainCommands(extensionKeys[key], keys[key]);
            }
            else {
                extensionKeys[key] = keys[key];
            }
        });
        return keymap(extensionKeys);
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
        return plugins.concat(customPlugins, [keyPlugin]);
    };
    App.prototype.getNodeViews = function () {
        var extensions = this.props.extensions;
        var views = {};
        extensions.forEach(function (extension) {
            if (extension.render) {
                views[extension.name] = function (node, view, getPos) {
                    var dom = document.createElement('div');
                    setTimeout(function () {
                        ReactDOM.render(React.createElement(React.Fragment, null, extension.render(node, view, getPos)), dom);
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
                React.createElement(Editor, { options: editorOptions, nodeViews: nodeViews, onChange: function (doc) {
                        var selected = _this.container.querySelector('.selected');
                        if (selected) {
                            var viewport = getViewport();
                            var top_1 = getScrollTop() + viewport.height;
                            var offsetTop = getOffset(selected).top;
                            var height = selected.offsetHeight;
                            if (offsetTop + height + 80 >= top_1) {
                                if (/iPod|iPhone|iPad/.test(navigator.platform) && document.activeElement) {
                                    var activeElement = document.activeElement;
                                    if (activeElement.isContentEditable) {
                                        scrollTo(0, offsetTop);
                                    }
                                }
                                else {
                                    scrollTo(0, offsetTop + height + 80);
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
                            React.createElement(PositionBtns, { view: view, menu: { blocks: _this.getMenu(blocks) } }),
                            React.createElement(InlineMenuBar, { menu: { marks: _this.getMenu(marks) }, view: view }),
                            editor));
                    } }))));
    };
    App.defaultProps = {
        extensions: extensions
    };
    return App;
}(React.Component));
export default App;
var templateObject_1, templateObject_2;
//# sourceMappingURL=index.js.map