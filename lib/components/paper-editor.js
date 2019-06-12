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
import { Schema, Node, DOMParser, DOMSerializer } from 'prosemirror-model';
import { keymap } from 'prosemirror-keymap';
import { chainCommands } from 'prosemirror-commands';
import scrollTo from 'scroll-to';
import uuid from 'uuid';
import Editor from './editor';
import InlineMenu from './inline-menu';
import EditMenu from './edit-menu';
import Menu from './menu';
import BackBtn from './back-btn';
import CustomLayout from './custom-layout';
import plugins from '../config/plugins';
import keys from '../config/keys';
import { getScrollTop, getOffset, getViewport } from '../utils';
import extensions from '../extensions';
var Input = styled('div')(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  width: 100%;\n  overflow-y: auto;\n"], ["\n  width: 100%;\n  overflow-y: auto;\n"])));
var Container = styled.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  max-width: 780px;\n  margin: 0 auto;\n  position: relative;\n  padding: 10px 0 80px 0;\n"], ["\n  max-width: 780px;\n  margin: 0 auto;\n  position: relative;\n  padding: 10px 0 80px 0;\n"])));
var EDITMENUHEIGHT = 80;
var App = /** @class */ (function (_super) {
    __extends(App, _super);
    function App(props) {
        var _this = _super.call(this, props) || this;
        _this.onChange = function (state, dispatch) {
            var doc = state.doc;
            if (_this.container) {
                var selected = _this.container.querySelector('.selected');
                if (selected) {
                    var viewport = getViewport();
                    var top_1 = getScrollTop() + viewport.height;
                    var offsetTop = getOffset(selected).top;
                    var height = selected.offsetHeight;
                    if (offsetTop + EDITMENUHEIGHT >= top_1) {
                        if (/iPod|iPhone|iPad/.test(navigator.platform) &&
                            document.activeElement) {
                            var activeElement = document.activeElement;
                            if (activeElement.isContentEditable) {
                                scrollTo(0, offsetTop - EDITMENUHEIGHT);
                            }
                        }
                        else {
                            scrollTo(0, offsetTop - EDITMENUHEIGHT);
                        }
                    }
                }
            }
            if (_this.props.onChange) {
                var schema = _this.schema;
                var html = _this.getHtmlFromNode(doc, _this.schema);
                _this.props.onChange({
                    json: doc.content,
                    html: html,
                    schema: schema
                });
            }
            var childCount = doc.content.childCount;
            var lastNode = doc.content.child(childCount - 1);
            if (lastNode.type.name !== 'paragraph') {
                var paragraph = state.schema.nodes.paragraph;
                dispatch(state.tr.insert(state.doc.content.size, paragraph.createAndFill()));
            }
        };
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
        if (_this.props.onInit) {
            _this.props.onInit({
                schema: schema
            });
        }
        _this.state = { doc: doc, containerId: uuid() };
        return _this;
    }
    App.prototype.getBlockSchemas = function (extensions) {
        var nodesSchema = extensions.filter(function (extension) {
            if (extension.schema && extension.schema.group === 'block') {
                return true;
            }
            return false;
        });
        var nodes = nodesSchema.reduce(function (node, curr, index) {
            var _a;
            var newNode = (_a = {}, _a[curr.name] = __assign({}, curr.schema), _a);
            return __assign({}, node, newNode);
        }, {});
        return nodes;
    };
    App.prototype.getBlocks = function (extensions) {
        var nodesSchema = extensions.filter(function (extension) {
            if (extension.group === 'block') {
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
            if (extension.group === 'mark') {
                return true;
            }
            return false;
        });
        return marksSchema;
    };
    App.prototype.getEdits = function (extensions) {
        var editMarks = extensions.filter(function (extension) {
            if (extension.group === 'edit') {
                return true;
            }
            return false;
        });
        return editMarks;
    };
    App.prototype.getSchemaBlockDependencies = function (extensions) {
        var schemas = extensions.reduce(function (schema, curr) {
            if (curr.schemaDependencies) {
                return Object.assign({}, schema, curr.schemaDependencies);
            }
            return schema;
        }, {});
        return schemas;
    };
    App.prototype.getSchemaFromExtensions = function (extensions) {
        var nodes = this.getBlockSchemas(extensions);
        var nodeDependencies = this.getSchemaBlockDependencies(extensions);
        var base = {
            doc: {
                content: 'block+'
            },
            text: {
                group: 'inline'
            },
            hard_break: {
                inline: true,
                group: 'inline',
                selectable: false,
                parseDOM: [{ tag: 'br' }],
                toDOM: function () {
                    return ['br'];
                }
            }
        };
        nodes = __assign({}, nodes, base, nodeDependencies);
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
                var registeredKeys_1 = extension.keys(_this.schema);
                Object.keys(registeredKeys_1).forEach(function (key) {
                    if (!extensionKeys[key]) {
                        extensionKeys[key] = [];
                    }
                    extensionKeys[key].push(registeredKeys_1[key]);
                });
            }
        });
        Object.keys(keys).forEach(function (key) {
            if (!extensionKeys[key]) {
                extensionKeys[key] = [];
            }
            extensionKeys[key].push(keys[key]);
        });
        var keyMaps = {};
        Object.keys(extensionKeys).forEach(function (extensionKey) {
            keyMaps[extensionKey] = chainCommands.apply(void 0, extensionKeys[extensionKey]);
        });
        return keymap(keyMaps);
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
                    requestAnimationFrame(function () {
                        ReactDOM.render(React.createElement(React.Fragment, null, extension.render(node, view, getPos)), dom);
                    });
                    return {
                        dom: dom,
                        ignoreMutation: function () {
                            return true;
                        },
                        stopEvent: function () {
                            return true;
                        }
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
        var _a = this.props, extensions = _a.extensions, showBackBtn = _a.showBackBtn;
        var _b = this.state, doc = _b.doc, containerId = _b.containerId;
        var schema = this.schema;
        var editorOptions = { schema: schema, plugins: this.getPlugins(), doc: doc };
        var blocks = this.getBlocks(extensions);
        var marks = this.getMarks(extensions);
        var edits = this.getEdits(extensions);
        var nodeViews = this.getNodeViews();
        return (React.createElement(Container, null,
            React.createElement("div", { id: containerId, ref: function (ref) {
                    if (ref && !_this.container) {
                        _this.container = ref;
                        _this.forceUpdate();
                    }
                } },
                React.createElement(Input, null,
                    React.createElement(Editor, { containerId: containerId, options: editorOptions, nodeViews: nodeViews, onChange: this.onChange, render: function (_a) {
                            var editor = _a.editor, view = _a.view;
                            return (React.createElement(React.Fragment, null,
                                React.createElement(Menu, { view: view, menu: _this.getMenu(blocks) }),
                                React.createElement(EditMenu, { view: view, menu: _this.getMenu(edits) }),
                                React.createElement(InlineMenu, { menu: _this.getMenu(marks), view: view }),
                                React.createElement(CustomLayout, { view: view, menu: _this.getMenu(blocks) }),
                                showBackBtn && React.createElement(BackBtn, { view: view }),
                                editor));
                        } })))));
    };
    App.defaultProps = {
        extensions: extensions,
        offsetTop: 0,
        showBackBtn: false
    };
    return App;
}(React.Component));
export default App;
var templateObject_1, templateObject_2;
//# sourceMappingURL=paper-editor.js.map