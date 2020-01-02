"use strict";
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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var styled_components_1 = require("styled-components");
var prosemirror_tables_1 = require("prosemirror-tables");
var prosemirror_commands_1 = require("prosemirror-commands");
var uuid = require("uuid");
var util_1 = require("./util");
var Table_1 = require("../../components/icons/Table");
var LeftInsert_1 = require("../../components/icons/LeftInsert");
var RightInsert_1 = require("../../components/icons/RightInsert");
var TopInsert_1 = require("../../components/icons/TopInsert");
var BottomInsert_1 = require("../../components/icons/BottomInsert");
var Split_1 = require("../../components/icons/Split");
var Merge_1 = require("../../components/icons/Merge");
var RemoveRow_1 = require("../../components/icons/RemoveRow");
var RemoveCol_1 = require("../../components/icons/RemoveCol");
var utils_1 = require("../../utils");
var types_1 = require("../../types");
var button_1 = require("../../components/button");
var schemas = prosemirror_tables_1.tableNodes({
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
var CellButton = styled_components_1.default(button_1.default)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  .icon {\n    font-size: 30px;\n  }\n"], ["\n  .icon {\n    font-size: 30px;\n  }\n"])));
var Table = /** @class */ (function (_super) {
    __extends(Table, _super);
    function Table(props) {
        return _super.call(this, props) || this;
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
            var _this = this;
            if (this.customSchema) {
                return this.customSchema;
            }
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
                        id: node.attrs.id || uuid(),
                        class: _this.className
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
            return React.createElement(Table_1.default, { style: { width: '24px', height: '24px' } });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Table.prototype, "hideBlockMenuOnFocus", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Table.prototype, "plugins", {
        get: function () {
            return [
                // columnResizing(),
                prosemirror_tables_1.tableEditing()
            ];
        },
        enumerable: true,
        configurable: true
    });
    Table.prototype.active = function (state) {
        return utils_1.blockActive(state.schema.nodes.table)(state);
    };
    Table.prototype.enable = function (state) {
        return prosemirror_commands_1.setBlockType(state.schema.nodes.table)(state);
    };
    Table.prototype.onClick = function (state, dispatch) {
        var table = utils_1.createTable(state.schema, {
            id: uuid()
        });
        var tr = state.tr.replaceSelectionWith(table);
        dispatch(tr);
    };
    Table.prototype.customInlineMenu = function (_a) {
        var state = _a.state, dispatch = _a.dispatch;
        return (React.createElement(React.Fragment, null,
            React.createElement(CellButton, { type: "button", onClick: function () {
                    prosemirror_tables_1.mergeCells(state, dispatch);
                } },
                React.createElement(Merge_1.default, { style: { width: '24px', height: '24px' } })),
            React.createElement(CellButton, { type: "button", onClick: function () {
                    prosemirror_tables_1.splitCell(state, dispatch);
                } },
                React.createElement(Split_1.default, { style: { width: '24px', height: '24px' } })),
            React.createElement(CellButton, { type: "button", onClick: function () {
                    util_1.toggleCell('th')(state, dispatch);
                } },
                React.createElement("span", { style: { display: 'inline-block', verticalAlign: 'text-bottom' } }, "th")),
            React.createElement(CellButton, { type: "button", onClick: function () {
                    util_1.toggleCell('td')(state, dispatch);
                } },
                React.createElement("span", { style: { display: 'inline-block', verticalAlign: 'text-bottom' } }, "td"))));
    };
    Table.prototype.customMenu = function (_a) {
        var state = _a.state, dispatch = _a.dispatch;
        return (React.createElement(React.Fragment, null,
            React.createElement(CellButton, { type: "button", onClick: function () {
                    prosemirror_tables_1.addColumnAfter(state, dispatch);
                } },
                React.createElement(RightInsert_1.default, { style: { width: '24px', height: '24px' } })),
            React.createElement(CellButton, { type: "button", onClick: function () {
                    prosemirror_tables_1.addColumnBefore(state, dispatch);
                } },
                React.createElement(LeftInsert_1.default, { style: { width: '24px', height: '24px' } })),
            React.createElement(CellButton, { type: "button", onClick: function () {
                    prosemirror_tables_1.addRowBefore(state, dispatch);
                } },
                React.createElement(TopInsert_1.default, { style: { width: '24px', height: '24px' } })),
            React.createElement(CellButton, { type: "button", onClick: function () {
                    prosemirror_tables_1.addRowAfter(state, dispatch);
                } },
                React.createElement(BottomInsert_1.default, { style: { width: '24px', height: '24px' } })),
            React.createElement(CellButton, { type: "button", onClick: function () {
                    prosemirror_tables_1.deleteColumn(state, dispatch);
                } },
                React.createElement(RemoveCol_1.default, { style: { width: '24px', height: '24px' } })),
            React.createElement(CellButton, { type: "button", onClick: function () {
                    prosemirror_tables_1.deleteRow(state, dispatch);
                } },
                React.createElement(RemoveRow_1.default, { style: { width: '24px', height: '24px' } }))));
    };
    Table.prototype.keys = function () {
        return {
            Tab: prosemirror_tables_1.goToNextCell(1),
            'Shift-Tab': prosemirror_tables_1.goToNextCell(-1)
        };
    };
    return Table;
}(types_1.Extension));
exports.default = Table;
var templateObject_1;
//# sourceMappingURL=index.js.map