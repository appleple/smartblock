var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
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
import styled from 'styled-components';
import { Schema, Node, DOMParser } from 'prosemirror-model';
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
import Title from './title';
import { getScrollTop, getOffset, getViewport, getHtmlFromNode, getParentNodeFromState } from '../utils';
import defaultExtensions from '../extensions';
var useState = React.useState, useRef = React.useRef;
var Input = styled('div')(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  width: 100%;\n  overflow-y: auto;\n"], ["\n  width: 100%;\n  overflow-y: auto;\n"])));
var Container = styled.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  ", "\n  margin: 0 auto;\n  padding: 10px 0 80px 0;\n"], ["\n  ",
    "\n  margin: 0 auto;\n  padding: 10px 0 80px 0;\n"])), function (props) {
    if (!props.full) {
        return "max-width: 780px;";
    }
    return '';
});
var Inner = styled.div(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  position: relative;\n"], ["\n  position: relative;\n"])));
var EDITMENUHEIGHT = 80;
var getBlockSchemas = function (extensions) {
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
var getBlocks = function (extensions) {
    var nodesSchema = extensions.filter(function (extension) {
        if (extension.group === 'block') {
            return true;
        }
        return false;
    });
    return nodesSchema;
};
var getMarks = function (extensions) {
    var marksSchema = extensions.filter(function (extension) {
        if (extension.group === 'mark') {
            return true;
        }
        return false;
    });
    return marksSchema;
};
var getMarkSchemas = function (extensions) {
    var marksSchema = getMarks(extensions);
    var marks = marksSchema.reduce(function (mark, curr, index) {
        var _a;
        var newMark = (_a = {}, _a[curr.name] = __assign({}, curr.schema), _a);
        return __assign({}, mark, newMark);
    }, {});
    return marks;
};
var getEdits = function (extensions) {
    var editMarks = extensions.filter(function (extension) {
        if (extension.group === 'edit') {
            return true;
        }
        return false;
    });
    return editMarks;
};
var getSchemaBlockDependencies = function (extensions) {
    var schemas = extensions.reduce(function (schema, curr) {
        if (curr.schemaDependencies) {
            return Object.assign({}, schema, curr.schemaDependencies);
        }
        return schema;
    }, {});
    return schemas;
};
var getSchemaFromExtensions = function (extensions) {
    var nodes = getBlockSchemas(extensions);
    var nodeDependencies = getSchemaBlockDependencies(extensions);
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
    var marks = getMarkSchemas(extensions);
    return new Schema({ nodes: nodes, marks: marks });
};
var getKeys = function (extensions, schema) {
    var extensionKeys = {};
    extensions.forEach(function (extension) {
        if (extension.keys) {
            var registeredKeys_1 = extension.keys(schema);
            Object.keys(registeredKeys_1).forEach(function (key) {
                if (!extensionKeys[key]) {
                    extensionKeys[key] = [];
                }
                extensionKeys[key].push(registeredKeys_1[key]);
            });
        }
    });
    var keyMaps = {};
    Object.keys(extensionKeys).forEach(function (extensionKey) {
        keyMaps[extensionKey] = chainCommands.apply(void 0, extensionKeys[extensionKey]);
    });
    return keymap(keyMaps);
};
var getMenu = function (extensions) {
    return extensions.filter(function (extension) { return extension.showMenu; });
};
var onChange = function (state, dispatch, props, schema, container) {
    var doc = state.doc;
    if (container && container.current) {
        var selected = container.current.querySelector('.selected');
        if (selected) {
            var viewport = getViewport();
            var top_1 = getScrollTop() + viewport.height;
            var offsetTop = getOffset(selected).top;
            if (offsetTop + EDITMENUHEIGHT >= top_1) {
                if (/iPod|iPhone|iPad/.test(navigator.platform) &&
                    document.activeElement) {
                    var activeElement = document.activeElement;
                    if (activeElement.isContentEditable) {
                        scrollTo(0, offsetTop - EDITMENUHEIGHT, {
                            duration: 300
                        });
                        return true;
                    }
                }
                else {
                    scrollTo(0, offsetTop - EDITMENUHEIGHT, {
                        duration: 300
                    });
                    return true;
                }
            }
        }
    }
    if (props.onChange) {
        var html = getHtmlFromNode(doc, schema);
        props.onChange({
            json: doc.toJSON(),
            html: html,
            schema: schema
        });
    }
    if (props.autoSave) {
        var pathname = location.pathname;
        var html = getHtmlFromNode(doc, schema);
        localStorage.setItem("paper-editor:" + pathname, html);
    }
    var childCount = doc.content.childCount;
    var lastNode = doc.content.child(childCount - 1);
    if (lastNode.type.name !== 'paragraph') {
        var paragraph = state.schema.nodes.paragraph;
        dispatch(state.tr.insert(state.doc.content.size, paragraph.createAndFill()));
    }
    return false;
};
var getPlugins = function (extensions, schema) {
    var customPlugins = [];
    extensions.forEach(function (extension) {
        if (extension.plugins) {
            customPlugins = customPlugins.concat(extension.plugins);
        }
    });
    var keyPlugin = getKeys(extensions, schema);
    return customPlugins.concat([keyPlugin]);
};
var getNodeViews = function (extensions) {
    var views = {};
    extensions.forEach(function (extension) {
        if (extension.view) {
            views[extension.name] = function (node, view, getPos) {
                return extension.view(node, view, getPos);
            };
        }
    });
    return views;
};
var titleChanged = function (title, props) {
    var pathname = location.pathname;
    localStorage.setItem("paper-editor-title:" + pathname, title);
    if (props.onTitleChange) {
        props.onTitleChange(title);
    }
};
var shouldRenderInlineMenu = function (view, blocks) {
    var node = getParentNodeFromState(view.state);
    var currentBlock = blocks.find(function (block) {
        if (block.name === node.type.name) {
            return true;
        }
        return false;
    });
    if (currentBlock && currentBlock.hideInlineMenuOnFocus) {
        return false;
    }
    return true;
};
export default (function (props) {
    var defaultProps = {
        extensions: defaultExtensions,
        offsetTop: 0,
        showBackBtn: false,
        autoSave: false,
        showTitle: false,
        titleText: '',
        full: false
    };
    props = Object.assign({}, defaultProps, props);
    var html = props.html, json = props.json, extensions = props.extensions, showBackBtn = props.showBackBtn, showTitle = props.showTitle;
    var titleText = props.titleText;
    var schema = getSchemaFromExtensions(props.extensions);
    var realHtml = html;
    if (json) {
        var node = Node.fromJSON(schema, json);
        realHtml = getHtmlFromNode(node, schema);
    }
    if (props.autoSave) {
        var pathname = location.pathname;
        var localHtml = localStorage.getItem("paper-editor:" + pathname);
        if (localHtml) {
            realHtml = localHtml;
        }
        if (showTitle) {
            titleText = localStorage.getItem("paper-editor-title:" + pathname);
        }
    }
    var div = document.createElement('div');
    div.innerHTML = realHtml;
    var doc = DOMParser.fromSchema(schema).parse(div);
    if (props.onInit) {
        props.onInit({
            schema: schema
        });
    }
    var _a = useState(true), showMenus = _a[0], setShowMenus = _a[1];
    var containerId = React.useMemo(function () {
        return uuid();
    }, []);
    var container = useRef(null);
    var editorOptions = { schema: schema, plugins: getPlugins(extensions, schema), doc: doc };
    var blocks = getBlocks(extensions);
    var marks = getMarks(extensions);
    var edits = getEdits(extensions);
    var nodeViews = getNodeViews(extensions);
    return (React.createElement("div", { id: containerId, onClick: function (e) {
            var target = e.target;
            if (target.getAttribute('id') === containerId) {
                setShowMenus(false);
            }
            else {
                setShowMenus(true);
            }
        } },
        React.createElement(Container, { full: props.full },
            props.showTitle &&
                React.createElement(Title, { onChange: function (title) {
                        titleChanged(title, props);
                    }, defaultValue: titleText, placeholder: props.titlePlaceholder }),
            React.createElement(Inner, null,
                React.createElement("div", { className: showMenus ? '' : 'ProseMirrorHideSelection', ref: container },
                    React.createElement(Input, null,
                        React.createElement(Editor, { options: editorOptions, nodeViews: nodeViews, onChange: function (state, dispatch) {
                                var shouldScroll = onChange(state, dispatch, props, schema, container);
                                if (shouldScroll) {
                                    setTimeout(function () {
                                        setShowMenus(true);
                                    }, 700);
                                }
                            }, render: function (_a) {
                                var editor = _a.editor, view = _a.view, scrolling = _a.scrolling;
                                if (scrolling) {
                                    setShowMenus(false);
                                }
                                return (React.createElement(React.Fragment, null,
                                    (showMenus) && React.createElement(React.Fragment, null,
                                        React.createElement(Menu, { view: view, menu: getMenu(blocks) }),
                                        React.createElement(EditMenu, { view: view, menu: getMenu(edits) }),
                                        shouldRenderInlineMenu(view, blocks) && React.createElement(InlineMenu, { menu: getMenu(marks), view: view }),
                                        React.createElement(CustomLayout, { view: view, menu: getMenu(blocks) }),
                                        showBackBtn && React.createElement(BackBtn, { view: view })),
                                    editor));
                            } })))))));
});
var templateObject_1, templateObject_2, templateObject_3;
//# sourceMappingURL=paper-editor.js.map