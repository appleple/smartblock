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
import { Schema, DOMParser } from 'prosemirror-model';
import { Plugin } from 'prosemirror-state';
import { Decoration, DecorationSet } from 'prosemirror-view';
import { getHtmlFromNode } from '../utils';
import { useView } from '../utils/hooks';
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
var placeholderPlugin = function (text) {
    return new Plugin({
        props: {
            decorations: function (state) {
                var doc = state.doc;
                if (doc.childCount == 1 &&
                    doc.firstChild.isTextblock &&
                    doc.firstChild.content.size == 0) {
                    return DecorationSet.create(doc, [
                        Decoration.widget(1, document.createTextNode(text))
                    ]);
                }
            }
        }
    });
};
export default (function (props) {
    var defaultProps = {
        placeholder: 'ここにタイトルを入力',
        defaultValue: ''
    };
    props = Object.assign({}, defaultProps, props);
    var titleRef = useRef(null);
    var schema = new Schema(__assign({}, schemaDef));
    var div = document.createElement('div');
    div.innerHTML = props.defaultValue;
    var doc = DOMParser.fromSchema(schema).parse(div);
    var config = {
        onChange: function (state) {
            if (props.onChange) {
                var title = getHtmlFromNode(state.doc, schema);
                title = title.replace(/<h1>(.*)<\/h1>/, '$1');
                props.onChange(title);
            }
        },
        options: {
            schema: schema,
            doc: doc,
            plugins: [placeholderPlugin(props.placeholder)]
        }
    };
    useEffect(function () {
        titleRef.current.appendChild(view.dom);
    }, []);
    var view = useView(config);
    return React.createElement("div", { ref: titleRef });
});
//# sourceMappingURL=title.js.map