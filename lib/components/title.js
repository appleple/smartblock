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
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var prosemirror_model_1 = require("prosemirror-model");
var prosemirror_state_1 = require("prosemirror-state");
var prosemirror_view_1 = require("prosemirror-view");
var utils_1 = require("../utils");
var hooks_1 = require("../utils/hooks");
var useRef = React.useRef, useEffect = React.useEffect;
var schemaDef = {
    nodes: {
        doc: {
            content: 'block'
        },
        text: {
            group: 'inline'
        },
        title: {
            group: 'block',
            content: 'text*',
            selectable: false,
            parseDOM: [{ tag: 'h1' }],
            toDOM: function () {
                return ['h1', 0];
            }
        }
    }
};
var placeholderPlugin = function () {
    return new prosemirror_state_1.Plugin({
        props: {
            decorations: function (state) {
                var decorations = [];
                var decorate = function (node, pos) {
                    if (node.type.isBlock && node.childCount === 0) {
                        decorations.push(prosemirror_view_1.Decoration.node(pos, pos + node.nodeSize, {
                            class: 'empty-node',
                        }));
                    }
                };
                state.doc.descendants(decorate);
                return prosemirror_view_1.DecorationSet.create(state.doc, decorations);
            },
        },
    });
};
exports.default = (function (props) {
    var defaultProps = {
        placeholder: 'Title here...',
        defaultValue: ''
    };
    props = Object.assign({}, defaultProps, props);
    var titleRef = useRef(null);
    var schema = new prosemirror_model_1.Schema(__assign({}, schemaDef));
    var div = document.createElement('div');
    div.innerHTML = props.defaultValue;
    var doc = prosemirror_model_1.DOMParser.fromSchema(schema).parse(div);
    var config = {
        onChange: function (state) {
            if (props.onChange) {
                var title = utils_1.getHtmlFromNode(state.doc, schema);
                title = title.replace(/<h1>(.*)<\/h1>/, '$1');
                props.onChange(title);
            }
        },
        options: {
            schema: schema,
            doc: doc,
            plugins: [placeholderPlugin()]
        }
    };
    var view = hooks_1.useView(config);
    useEffect(function () {
        titleRef.current.appendChild(view.dom);
    }, []);
    return React.createElement("div", { ref: titleRef });
});
//# sourceMappingURL=title.js.map