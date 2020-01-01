"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var prosemirror_schema_list_1 = require("prosemirror-schema-list");
var uuid_1 = require("uuid");
var Undent_1 = require("../components/icons/Undent");
var Indent_1 = require("../components/icons/Indent");
var List_1 = require("../components/icons/List");
var utils_1 = require("../utils");
var types_1 = require("../types");
var button_1 = require("../components/button");
var BulletList = /** @class */ (function (_super) {
    __extends(BulletList, _super);
    function BulletList(props) {
        return _super.call(this, props) || this;
    }
    Object.defineProperty(BulletList.prototype, "name", {
        get: function () {
            return 'bullet_list';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BulletList.prototype, "group", {
        get: function () {
            return 'block';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BulletList.prototype, "showMenu", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BulletList.prototype, "schema", {
        get: function () {
            if (this.customSchema) {
                return;
            }
            return {
                content: 'list_item+',
                group: 'block',
                parseDOM: [
                    {
                        tag: 'ul',
                        getAttrs: function (dom) {
                            return {
                                id: dom.getAttribute('id')
                            };
                        }
                    }
                ],
                attrs: {
                    id: { default: '' }
                },
                toDOM: function (node) {
                    return [
                        'ul',
                        {
                            id: node.attrs.id || uuid_1.default(),
                            class: this.className
                        },
                        0
                    ];
                }
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BulletList.prototype, "icon", {
        get: function () {
            return React.createElement(List_1.default, { style: { width: '24px', height: '24px' } });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BulletList.prototype, "hideBlockMenuOnFocus", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    BulletList.prototype.active = function (state) {
        return utils_1.blockActive(state.schema.nodes.bullet_list)(state);
    };
    BulletList.prototype.enable = function (state) {
        var node = utils_1.getParentNodeFromState(state);
        if (node.type.name !== 'paragraph') {
            return false;
        }
        return prosemirror_schema_list_1.wrapInList(state.schema.nodes.bullet_list)(state);
    };
    BulletList.prototype.onClick = function (state, dispatch) {
        var node = utils_1.getParentNodeFromState(state);
        if (node.type.name !== 'paragraph') {
            return false;
        }
        prosemirror_schema_list_1.wrapInList(state.schema.nodes.bullet_list)(state, dispatch);
    };
    BulletList.prototype.customMenu = function (_a) {
        var state = _a.state, dispatch = _a.dispatch;
        return (React.createElement(React.Fragment, null,
            React.createElement(button_1.default, { type: "button", disabled: !utils_1.liftListItem(state.schema.nodes.list_item)(state), onClick: function () {
                    utils_1.liftListItem(state.schema.nodes.list_item)(state, dispatch);
                } },
                React.createElement(Undent_1.default, { style: { width: '24px', height: '24px' } })),
            React.createElement(button_1.default, { type: "button", disabled: !prosemirror_schema_list_1.sinkListItem(state.schema.nodes.list_item)(state), onClick: function () {
                    prosemirror_schema_list_1.sinkListItem(state.schema.nodes.list_item)(state, dispatch);
                } },
                React.createElement(Indent_1.default, { style: { width: '24px', height: '24px' } }))));
    };
    return BulletList;
}(types_1.Extension));
exports.default = BulletList;
//# sourceMappingURL=bullet-list.js.map