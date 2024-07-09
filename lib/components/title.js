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
var utils_1 = require("../utils");
var hooks_1 = require("../utils/hooks");
var default_plugins_1 = require("../extensions/default-plugins");
var useRef = React.useRef, useEffect = React.useEffect;
var schemaDef = {
    nodes: {
        doc: {
            content: 'block',
        },
        text: {
            group: 'inline',
        },
        title: {
            group: 'block',
            content: 'text*',
            selectable: false,
            parseDOM: [{ tag: 'h1' }],
            toDOM: function () {
                return ['h1', 0];
            },
        },
    },
};
exports.default = (function (props) {
    var defaultProps = {
        defaultValue: '',
        placeholder: 'Type Title here',
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
                var title = (0, utils_1.getHtmlFromNode)(state.doc, schema);
                title = title.replace(/<h1>(.*)<\/h1>/, '$1');
                props.onChange(title);
            }
        },
        options: {
            schema: schema,
            doc: doc,
            plugins: [
                (0, default_plugins_1.placeholderPlugin)({
                    placeholder: props.placeholder || defaultProps.placeholder,
                }),
            ],
        },
    };
    var view = (0, hooks_1.useView)(config);
    useEffect(function () {
        if (titleRef.current) {
            titleRef.current.appendChild(view.dom);
        }
    }, []);
    return React.createElement("div", { ref: titleRef, className: "smartblock-title" });
});
//# sourceMappingURL=title.js.map