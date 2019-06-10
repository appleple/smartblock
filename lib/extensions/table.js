var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
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
import styled from 'styled-components';
import { addColumnAfter, addColumnBefore, deleteColumn, addRowAfter, addRowBefore, deleteRow, mergeCells, splitCell, goToNextCell, tableEditing, tableNodes } from 'prosemirror-tables';
import { setBlockType } from 'prosemirror-commands';
import uuid from 'uuid';
import TableIcon from '../components/icons/Table';
import LeftInsertIcon from '../components/icons/LeftInsert';
import RightInsertIcon from '../components/icons/RightInsert';
import TopInsertIcon from '../components/icons/TopInsert';
import BottomInsertIcon from '../components/icons/BottomInsert';
import SplitIcon from '../components/icons/Split';
import MergeIcon from '../components/icons/Merge';
import { createTable, blockActive } from '../utils';
import Button from '../components/button';
var schemas = tableNodes({
    group: 'block',
    tableGroup: 'block',
    cellContent: 'block+',
    cellAttributes: {
        background: {
            default: null,
            getFromDOM: function (dom) {
                return dom.style.backgroundColor || null;
            },
            setDOMAttr: function (value, attrs) {
                if (value)
                    attrs.style = (attrs.style || '') + "background-color: " + value + ";";
            }
        }
    }
});
var CellButton = styled(Button)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  .icon {\n    font-size: 30px;\n  }\n"], ["\n  .icon {\n    font-size: 30px;\n  }\n"])));
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
    Object.defineProperty(Table.prototype, "group", {
        get: function () {
            return 'block';
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
            schemas.table.parseDOM = [
                {
                    tag: 'table',
                    getAttrs: function (dom) {
                        return {
                            id: dom.getAttribute('id') || uuid()
                        };
                    }
                }
            ];
            schemas.table.toDOM = function (node) {
                return [
                    'table',
                    {
                        id: node.attrs.id || uuid()
                    },
                    ['tbody', 0]
                ];
            };
            schemas.table.attrs = {
                id: { default: '' }
            };
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
            return React.createElement(TableIcon, { style: { width: '24px', height: '24px' } });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Table.prototype, "plugins", {
        get: function () {
            return [
                // columnResizing(),
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
        var table = createTable(state.schema, {
            id: uuid()
        });
        var tr = state.tr.replaceSelectionWith(table);
        dispatch(tr);
    };
    Table.prototype.customMenu = function (_a) {
        var state = _a.state, dispatch = _a.dispatch;
        return (React.createElement(React.Fragment, null,
            React.createElement(CellButton, { type: "button", onClick: function () {
                    addColumnBefore(state, dispatch);
                } },
                React.createElement(LeftInsertIcon, { style: { width: '24px', height: '24px' } })),
            React.createElement(CellButton, { type: "button", onClick: function () {
                    addColumnAfter(state, dispatch);
                } },
                React.createElement(RightInsertIcon, { style: { width: '24px', height: '24px' } })),
            React.createElement(CellButton, { type: "button", onClick: function () {
                    addRowBefore(state, dispatch);
                } },
                React.createElement(TopInsertIcon, { style: { width: '24px', height: '24px' } })),
            React.createElement(CellButton, { type: "button", onClick: function () {
                    addRowAfter(state, dispatch);
                } },
                React.createElement(BottomInsertIcon, { style: { width: '24px', height: '24px' } })),
            React.createElement(CellButton, { type: "button", onClick: function () {
                    deleteColumn(state, dispatch);
                } }, "\u5217\u524A\u9664"),
            React.createElement(CellButton, { type: "button", onClick: function () {
                    deleteRow(state, dispatch);
                } }, "\u884C\u524A\u9664"),
            React.createElement(CellButton, { type: "button", onClick: function () {
                    mergeCells(state, dispatch);
                } },
                React.createElement(SplitIcon, { style: { width: '24px', height: '24px' } })),
            React.createElement(CellButton, { type: "button", onClick: function () {
                    splitCell(state, dispatch);
                } },
                React.createElement(MergeIcon, { style: { width: '24px', height: '24px' } }))));
    };
    Table.prototype.keys = function () {
        return {
            Tab: goToNextCell(1),
            'Shift-Tab': goToNextCell(-1)
        };
    };
    return Table;
}());
export default Table;
var templateObject_1;
//# sourceMappingURL=table.js.map