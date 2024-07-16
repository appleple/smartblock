"use strict";
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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var prosemirror_model_1 = require("prosemirror-model");
var prosemirror_keymap_1 = require("prosemirror-keymap");
var prosemirror_commands_1 = require("prosemirror-commands");
var scrollTo = require("scroll-to");
var classnames_1 = require("classnames");
var uuid = require("uuid/v4");
var editor_1 = require("./editor");
var inline_menu_1 = require("./inline-menu");
var edit_menu_1 = require("./edit-menu");
var menu_1 = require("./menu");
var back_btn_1 = require("./back-btn");
var custom_layout_1 = require("./custom-layout");
var title_1 = require("./title");
var utils_1 = require("../utils");
var base_1 = require("../extensions/base");
var hooks_1 = require("../utils/hooks");
var useState = React.useState, useEffect = React.useEffect, useRef = React.useRef;
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
        return __assign(__assign({}, node), newNode);
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
        return __assign(__assign({}, mark), newMark);
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
            content: 'block+',
        },
        text: {
            group: 'inline',
        },
        hard_break: {
            inline: true,
            group: 'inline',
            selectable: false,
            parseDOM: [{ tag: 'br' }],
            toDOM: function () {
                return ['br'];
            },
        },
    };
    nodes = __assign(__assign(__assign({}, nodes), base), nodeDependencies);
    var marks = getMarkSchemas(extensions);
    return new prosemirror_model_1.Schema({ nodes: nodes, marks: marks });
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
        keyMaps[extensionKey] = prosemirror_commands_1.chainCommands.apply(void 0, extensionKeys[extensionKey]);
    });
    return (0, prosemirror_keymap_1.keymap)(keyMaps);
};
var getMenu = function (extensions) {
    return extensions.filter(function (extension) { return extension.showMenu; });
};
var onChange = function (state, dispatch, props, schema, container, showdown //any
) {
    var doc = state.doc;
    if (container && container.current) {
        var selected = container.current.querySelector('.selected');
        if (selected) {
            var viewport = (0, utils_1.getViewport)();
            var top_1 = (0, utils_1.getScrollTop)() + viewport.height;
            var offsetTop = (0, utils_1.getOffset)(selected).top;
            if (offsetTop + EDITMENUHEIGHT >= top_1) {
                if (/iPod|iPhone|iPad/.test(navigator.platform) && document.activeElement) {
                    var activeElement = document.activeElement;
                    if (activeElement.isContentEditable) {
                        scrollTo(0, offsetTop - EDITMENUHEIGHT, {
                            duration: 300,
                        });
                        return true;
                    }
                }
                else {
                    scrollTo(0, offsetTop - EDITMENUHEIGHT, {
                        duration: 300,
                    });
                    return true;
                }
            }
        }
    }
    if (props.onChange) {
        var html = (0, utils_1.getHtmlFromNode)(doc, schema);
        var change = {
            json: doc.toJSON(),
            html: html,
            schema: schema,
        };
        if (props.outputMarkdown && showdown) {
            var converter = new showdown.Converter();
            converter.setFlavor('github');
            change.markdown = converter.makeMd(html);
        }
        props.onChange(change);
    }
    if (props.autoSave) {
        var pathname = location.pathname;
        var html = (0, utils_1.getHtmlFromNode)(doc, schema);
        localStorage.setItem("smartblock:".concat(pathname), html);
    }
    var childCount = doc.content.childCount;
    var lastNode = doc.content.child(childCount - 1);
    if (lastNode.type.name !== 'paragraph') {
        var paragraph = state.schema.nodes.paragraph;
        dispatch(state.tr.insert(state.doc.content.size, paragraph.createAndFill()));
    }
    else if (lastNode.textContent.length !== 0) {
        var paragraph = state.schema.nodes.paragraph;
        dispatch(state.tr.insert(state.doc.content.size, paragraph.createAndFill()));
    }
    return false;
};
var getPlugins = function (extensions, schema) {
    var customPlugins = [];
    extensions.forEach(function (extension) {
        if (extension.plugins) {
            customPlugins = __spreadArray(__spreadArray([], customPlugins, true), extension.plugins, true);
        }
    });
    var keyPlugin = getKeys(extensions, schema);
    return __spreadArray(__spreadArray([], customPlugins, true), [keyPlugin], false);
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
    localStorage.setItem("smartblock-title:".concat(pathname), title);
    if (props.onTitleChange) {
        props.onTitleChange(title);
    }
};
var shouldRenderInlineMenu = function (view, blocks) {
    var node = (0, utils_1.getParentNodeFromState)(view.state);
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
exports.default = (function (props) {
    var defaultProps = {
        extensions: base_1.default,
        offsetTop: 0,
        showBackBtn: false,
        autoSave: false,
        showTitle: false,
        titleText: '',
        full: false,
    };
    props = Object.assign({}, defaultProps, props);
    var html = props.html, json = props.json, extensions = props.extensions, showBackBtn = props.showBackBtn, showTitle = props.showTitle, markdown = props.markdown, showdown = props.showdown;
    var titleText = props.titleText;
    var schema = getSchemaFromExtensions(props.extensions);
    var realHtml = html;
    if (json) {
        var node = prosemirror_model_1.Node.fromJSON(schema, json);
        realHtml = (0, utils_1.getHtmlFromNode)(node, schema);
    }
    if (markdown && showdown) {
        var converter = new showdown.Converter();
        converter.setFlavor('github');
        realHtml = converter.makeHtml(markdown);
    }
    if (props.autoSave) {
        var pathname = location.pathname;
        var localHtml = localStorage.getItem("smartblock:".concat(pathname));
        if (localHtml) {
            realHtml = localHtml;
        }
        if (showTitle) {
            titleText = localStorage.getItem("smartblock-title:".concat(pathname));
        }
    }
    var _a = useState(null), options = _a[0], setOptions = _a[1];
    var app = useRef(null);
    useEffect(function () {
        var div = document.createElement('div');
        div.innerHTML = realHtml;
        var doc = prosemirror_model_1.DOMParser.fromSchema(schema).parse(div, {
            preserveWhitespace: true,
        });
        if (props.onInit) {
            props.onInit({
                schema: schema,
            });
        }
        if (props.getEditorRef) {
            props.getEditorRef(app);
        }
        var editorOptions = { schema: schema, plugins: getPlugins(extensions, schema), doc: doc };
        setOptions(editorOptions);
    }, []);
    var _b = useState(true), showMenus = _b[0], setShowMenus = _b[1];
    var containerId = React.useMemo(function () {
        return uuid();
    }, []);
    var container = useRef(null);
    var blocks = getBlocks(extensions);
    var marks = getMarks(extensions);
    var edits = getEdits(extensions);
    var nodeViews = getNodeViews(extensions);
    var editorRef = useRef(null);
    var scrolling = (0, hooks_1.useScrolling)(editorRef, 300);
    useEffect(function () {
        if (scrolling) {
            setShowMenus(false);
        }
    }, [scrolling]);
    return (React.createElement("div", { id: containerId, onClick: function (e) {
            var target = e.target;
            if (target.getAttribute('id') === containerId) {
                setShowMenus(false);
            }
            else {
                setShowMenus(true);
            }
        }, ref: app },
        React.createElement("div", { className: (0, classnames_1.default)('smartblock-container', {
                'is-full': props.full,
            }) },
            props.showTitle && (React.createElement(title_1.default, { placeholder: props.titlePlaceholder, onChange: function (title) {
                    titleChanged(title, props);
                }, defaultValue: titleText })),
            React.createElement("div", { className: "smartblock-inner" },
                React.createElement("div", { className: showMenus ? '' : 'ProseMirrorHideSelection', ref: container },
                    React.createElement("div", { className: "smartblock-input-area" }, options && (React.createElement(editor_1.default, { editorRef: editorRef, options: options, nodeViews: nodeViews, onChange: function (state, dispatch) {
                            var shouldScroll = onChange(state, dispatch, props, schema, container, showdown);
                            if (shouldScroll) {
                                setTimeout(function () {
                                    setShowMenus(true);
                                }, 700);
                            }
                        }, render: function (_a) {
                            var editor = _a.editor, view = _a.view;
                            return (React.createElement(React.Fragment, null,
                                showMenus && (React.createElement(React.Fragment, null,
                                    React.createElement(menu_1.default, { view: view, menu: getMenu(blocks) }),
                                    React.createElement(edit_menu_1.default, { view: view, menu: getMenu(edits) }),
                                    shouldRenderInlineMenu(view, blocks) && (React.createElement(inline_menu_1.default, { menu: getMenu(marks), blockMenu: getMenu(blocks), view: view })),
                                    React.createElement(custom_layout_1.default, { view: view, menu: getMenu(blocks) }),
                                    showBackBtn && React.createElement(back_btn_1.default, { view: view }))),
                                editor));
                        } }))))))));
});
//# sourceMappingURL=smartblock.js.map