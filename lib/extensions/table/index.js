"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
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
var prosemirror_tables_1 = require("prosemirror-tables");
var prosemirror_commands_1 = require("prosemirror-commands");
var uuid = require("uuid/v4");
var util_1 = require("./util");
var table_1 = require("../../components/icons/table");
var left_insert_1 = require("../../components/icons/left-insert");
var right_insert_1 = require("../../components/icons/right-insert");
var top_insert_1 = require("../../components/icons/top-insert");
var bottom_insert_1 = require("../../components/icons/bottom-insert");
var split_1 = require("../../components/icons/split");
var merge_1 = require("../../components/icons/merge");
var remove_row_1 = require("../../components/icons/remove-row");
var remove_col_1 = require("../../components/icons/remove-col");
var utils_1 = require("../../utils");
var types_1 = require("../../types");
var button_1 = require("../../components/button");
var schemas = (0, prosemirror_tables_1.tableNodes)({
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
                    attrs.style = "".concat(attrs.style || '', "background-color: ").concat(value, ";");
            }
        }
    }
});
var Table = /** @class */ (function (_super) {
    __extends(Table, _super);
    function Table(props) {
        return _super.call(this, props) || this;
    }
    Object.defineProperty(Table.prototype, "name", {
        // @ts-ignore
        get: function () {
            return 'table';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Table.prototype, "group", {
        // @ts-ignore
        get: function () {
            return 'block';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Table.prototype, "showMenu", {
        // @ts-ignore
        get: function () {
            return true;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Table.prototype, "schema", {
        // @ts-ignore
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
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Table.prototype, "schemaDependencies", {
        // @ts-ignore
        get: function () {
            var table = schemas.table, noTable = __rest(schemas, ["table"]);
            return noTable;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Table.prototype, "icon", {
        // @ts-ignore
        get: function () {
            return React.createElement(table_1.default, { style: { width: '24px', height: '24px' } });
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Table.prototype, "hideBlockMenuOnFocus", {
        // @ts-ignore
        get: function () {
            return true;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Table.prototype, "plugins", {
        // @ts-ignore
        get: function () {
            return [
                // columnResizing(),
                (0, prosemirror_tables_1.tableEditing)()
            ];
        },
        enumerable: false,
        configurable: true
    });
    Table.prototype.active = function (state) {
        return (0, utils_1.blockActive)(state.schema.nodes.table)(state);
    };
    Table.prototype.enable = function (state) {
        return (0, prosemirror_commands_1.setBlockType)(state.schema.nodes.table)(state);
    };
    Table.prototype.onClick = function (state, dispatch) {
        var table = (0, utils_1.createTable)(state.schema, {
            id: uuid()
        });
        var tr = state.tr.replaceSelectionWith(table);
        dispatch(tr);
    };
    Table.prototype.customInlineMenu = function (_a) {
        var state = _a.state, dispatch = _a.dispatch;
        return (React.createElement(React.Fragment, null,
            React.createElement(button_1.default, { type: "button", className: "smartblock-cell-btn", onClick: function () {
                    (0, prosemirror_tables_1.mergeCells)(state, dispatch);
                } },
                React.createElement(merge_1.default, { style: { width: '24px', height: '24px' } })),
            React.createElement(button_1.default, { type: "button", className: "smartblock-cell-btn", onClick: function () {
                    (0, prosemirror_tables_1.splitCell)(state, dispatch);
                } },
                React.createElement(split_1.default, { style: { width: '24px', height: '24px' } })),
            React.createElement(button_1.default, { type: "button", className: "smartblock-cell-btn", onClick: function () {
                    (0, util_1.toggleCell)('th')(state, dispatch);
                } },
                React.createElement("span", { style: { display: 'inline-block', verticalAlign: 'text-bottom' } }, "th")),
            React.createElement(button_1.default, { type: "button", className: "smartblock-cell-btn", onClick: function () {
                    (0, util_1.toggleCell)('td')(state, dispatch);
                } },
                React.createElement("span", { style: { display: 'inline-block', verticalAlign: 'text-bottom' } }, "td"))));
    };
    Table.prototype.customMenu = function (_a) {
        var state = _a.state, dispatch = _a.dispatch;
        return (React.createElement(React.Fragment, null,
            React.createElement(button_1.default, { type: "button", onClick: function () {
                    (0, prosemirror_tables_1.addColumnAfter)(state, dispatch);
                } },
                React.createElement(right_insert_1.default, { style: { width: '24px', height: '24px' } })),
            React.createElement(button_1.default, { type: "button", onClick: function () {
                    (0, prosemirror_tables_1.addColumnBefore)(state, dispatch);
                } },
                React.createElement(left_insert_1.default, { style: { width: '24px', height: '24px' } })),
            React.createElement(button_1.default, { type: "button", onClick: function () {
                    (0, prosemirror_tables_1.addRowBefore)(state, dispatch);
                } },
                React.createElement(top_insert_1.default, { style: { width: '24px', height: '24px' } })),
            React.createElement(button_1.default, { type: "button", onClick: function () {
                    (0, prosemirror_tables_1.addRowAfter)(state, dispatch);
                } },
                React.createElement(bottom_insert_1.default, { style: { width: '24px', height: '24px' } })),
            React.createElement(button_1.default, { type: "button", onClick: function () {
                    (0, prosemirror_tables_1.deleteColumn)(state, dispatch);
                } },
                React.createElement(remove_col_1.default, { style: { width: '24px', height: '24px' } })),
            React.createElement(button_1.default, { type: "button", onClick: function () {
                    (0, prosemirror_tables_1.deleteRow)(state, dispatch);
                } },
                React.createElement(remove_row_1.default, { style: { width: '24px', height: '24px' } }))));
    };
    Table.prototype.keys = function () {
        return {
            Tab: (0, prosemirror_tables_1.goToNextCell)(1),
            'Shift-Tab': (0, prosemirror_tables_1.goToNextCell)(-1)
        };
    };
    return Table;
}(types_1.Extension));
exports.default = Table;
//# sourceMappingURL=index.js.map