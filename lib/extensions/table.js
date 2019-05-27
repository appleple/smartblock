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
        var tr = state.tr.replaceSelectionWith(table);
        dispatch(tr);
    };
    Table.prototype.customMenu = function (_a) {
        var state = _a.state, dispatch = _a.dispatch;
        return (React.createElement(React.Fragment, null,
            React.createElement(Button, { onClick: function () {
                    deleteColumn(state, dispatch);
                } },
                React.createElement("i", { className: "icon icon-right-remove" })),
            React.createElement(Button, { onClick: function () {
                    deleteRow(state, dispatch);
                } },
                React.createElement("i", { className: "icon icon-top-remove" })),
            React.createElement(Button, { onClick: function () {
                    addColumnBefore(state, dispatch);
                } },
                React.createElement("i", { className: "icon icon-left-insert" })),
            React.createElement(Button, { onClick: function () {
                    addColumnAfter(state, dispatch);
                } },
                React.createElement("i", { className: "icon icon-right-insert" })),
            React.createElement(Button, { onClick: function () {
                    addRowBefore(state, dispatch);
                } },
                React.createElement("i", { className: "icon icon-top-insert" })),
            React.createElement(Button, { onClick: function () {
                    addRowAfter(state, dispatch);
                } },
                React.createElement("i", { className: "icon icon-bottom-insert" })),
            React.createElement(Button, { onClick: function () {
                    mergeCells(state, dispatch);
                } },
                React.createElement("i", { className: "icon icon-merge01" })),
            React.createElement(Button, { onClick: function () {
                    splitCell(state, dispatch);
                } },
                React.createElement("i", { className: "icon icon-split01" }))));
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