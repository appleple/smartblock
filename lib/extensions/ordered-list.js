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
import * as React from 'react';
import { wrapInList, sinkListItem } from 'prosemirror-schema-list';
import uuid from 'uuid';
import OrderedListIcon from '../components/icons/OrderedList';
import IndentIcon from '../components/icons/Indent';
import UndentIcon from '../components/icons/Undent';
import { liftListItem, blockActive, getParentNodeFromState } from '../utils';
import { Extension } from '../types';
import Button from '../components/button';
var OrderedList = /** @class */ (function (_super) {
    __extends(OrderedList, _super);
    function OrderedList(props) {
        return _super.call(this, props) || this;
    }
    Object.defineProperty(OrderedList.prototype, "name", {
        get: function () {
            return 'ordered_list';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OrderedList.prototype, "group", {
        get: function () {
            return 'block';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OrderedList.prototype, "showMenu", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OrderedList.prototype, "schema", {
        get: function () {
            if (this.customSchema) {
                return this.customSchema;
            }
            return {
                content: 'list_item+',
                group: 'block',
                parseDOM: [
                    {
                        tag: 'ol',
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
                        'ol',
                        {
                            id: node.attrs.id || uuid(),
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
    Object.defineProperty(OrderedList.prototype, "icon", {
        get: function () {
            return React.createElement(OrderedListIcon, { style: { width: '24px', height: '24px' } });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OrderedList.prototype, "hideBlockMenuOnFocus", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    OrderedList.prototype.active = function (state) {
        return blockActive(state.schema.nodes.ordered_list)(state);
    };
    OrderedList.prototype.enable = function (state) {
        var node = getParentNodeFromState(state);
        if (node.type.name !== 'paragraph') {
            return false;
        }
        return wrapInList(state.schema.nodes.ordered_list)(state);
    };
    OrderedList.prototype.onClick = function (state, dispatch) {
        var node = getParentNodeFromState(state);
        if (node.type.name !== 'paragraph') {
            return false;
        }
        wrapInList(state.schema.nodes.ordered_list)(state, dispatch);
    };
    OrderedList.prototype.customMenu = function (_a) {
        var state = _a.state, dispatch = _a.dispatch;
        return (React.createElement(React.Fragment, null,
            React.createElement(Button, { type: "button", onClick: function () {
                    liftListItem(state.schema.nodes.list_item)(state, dispatch);
                } },
                React.createElement(UndentIcon, { style: { width: '24px', height: '24px' } })),
            React.createElement(Button, { type: "button", onClick: function () {
                    sinkListItem(state.schema.nodes.list_item)(state, dispatch);
                } },
                React.createElement(IndentIcon, { style: { width: '24px', height: '24px' } }))));
    };
    return OrderedList;
}(Extension));
export default OrderedList;
//# sourceMappingURL=ordered-list.js.map