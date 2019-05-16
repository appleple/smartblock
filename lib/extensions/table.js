var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
import * as React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faTable } from '@fortawesome/fontawesome-free-solid';
import { addColumnAfter, addColumnBefore, deleteColumn, addRowAfter, addRowBefore, deleteRow, mergeCells, splitCell, goToNextCell, tableEditing, columnResizing, tableNodes } from "prosemirror-tables";
import { createTable } from 'prosemirror-utils';
import { setBlockType } from 'prosemirror-commands';
import { NodeSelection } from 'prosemirror-state';
import { blockActive } from '../utils';
import Button from '../components/button';
var schemas = tableNodes({
    group: 'block',
    tableGroup: "block",
    cellContent: "block+",
    cellAttributes: {
        background: {
            default: null,
            getFromDOM: function (dom) { return dom.style.backgroundColor || null; },
            setDOMAttr: function (value, attrs) { if (value)
                attrs.style = (attrs.style || "") + ("background-color: " + value + ";"); }
        }
    }
});
var Table = /** @class */ (function () {
    function Table() {
    }
    Object.defineProperty(Table.prototype, "name", {
        get: function () {
            return 'table';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Table.prototype, "showMenu", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Table.prototype, "schema", {
        get: function () {
            return schemas.table;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Table.prototype, "schemaDependencies", {
        get: function () {
            var table = schemas.table, noTable = __rest(schemas, ["table"]);
            return noTable;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Table.prototype, "icon", {
        get: function () {
            return (React.createElement(FontAwesomeIcon, { icon: faTable }));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Table.prototype, "plugins", {
        get: function () {
            return [
                columnResizing(),
                tableEditing()
            ];
        },
        enumerable: true,
        configurable: true
    });
    Table.prototype.active = function (state) {
        return blockActive(state.schema.nodes.table)(state);
    };
    Table.prototype.enable = function (state) {
        return setBlockType(state.schema.nodes.table)(state);
    };
    Table.prototype.onClick = function (state, dispatch) {
        var table = createTable(state.schema);
        var tr = state.tr;
        dispatch(state.tr.replaceSelectionWith(table));
        var resolvedPos = tr.doc.resolve(tr.selection.anchor - tr.selection.$anchor.nodeBefore.nodeSize - 1);
        tr.setSelection(new NodeSelection(resolvedPos));
    };
    Table.prototype.customMenu = function (_a) {
        var state = _a.state, dispatch = _a.dispatch;
        return (React.createElement(React.Fragment, null,
            React.createElement(Button, { onClick: function () {
                    deleteColumn(state, dispatch);
                } }, "\u5217\u3092\u524A\u9664"),
            React.createElement(Button, { onClick: function () {
                    deleteRow(state, dispatch);
                } }, "\u884C\u3092\u524A\u9664"),
            React.createElement(Button, { onClick: function () {
                    addColumnBefore(state, dispatch);
                } }, "\u5DE6\u306B\u5217\u3092\u8FFD\u52A0"),
            React.createElement(Button, { onClick: function () {
                    addColumnAfter(state, dispatch);
                } }, "\u53F3\u306B\u5217\u3092\u8FFD\u52A0"),
            React.createElement(Button, { onClick: function () {
                    addRowBefore(state, dispatch);
                } }, "\u4E0A\u306B\u884C\u3092\u8FFD\u52A0"),
            React.createElement(Button, { onClick: function () {
                    addRowAfter(state, dispatch);
                } }, "\u4E0B\u306B\u884C\u3092\u8FFD\u52A0"),
            React.createElement(Button, { onClick: function () {
                    mergeCells(state, dispatch);
                } }, "\u30BB\u30EB\u306E\u7D50\u5408"),
            React.createElement(Button, { onClick: function () {
                    splitCell(state, dispatch);
                } }, "\u30BB\u30EB\u306E\u5206\u5272")));
    };
    Table.prototype.keys = function () {
        return {
            'Tab': goToNextCell(1),
            'Shift-Tab': goToNextCell(-1)
        };
    };
    return Table;
}());
export default Table;
//# sourceMappingURL=table.js.map