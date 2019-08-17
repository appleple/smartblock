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
import Undent from '../components/icons/Undent';
import Indent from '../components/icons/Indent';
import List from '../components/icons/List';
import { liftListItem, blockActive, getParentNodeFromState } from '../utils';
import { Extension } from '../types';
import Button from '../components/button';
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
    Object.defineProperty(BulletList.prototype, "icon", {
        get: function () {
            return React.createElement(List, { style: { width: '24px', height: '24px' } });
        },
        enumerable: true,
        configurable: true
    });
    BulletList.prototype.active = function (state) {
        return blockActive(state.schema.nodes.bullet_list)(state);
    };
    BulletList.prototype.enable = function (state) {
        var node = getParentNodeFromState(state);
        if (node.type.name !== 'paragraph') {
            return false;
        }
        return wrapInList(state.schema.nodes.bullet_list)(state);
    };
    BulletList.prototype.onClick = function (state, dispatch) {
        var node = getParentNodeFromState(state);
        if (node.type.name !== 'paragraph') {
            return false;
        }
        wrapInList(state.schema.nodes.bullet_list)(state, dispatch);
    };
    BulletList.prototype.customMenu = function (_a) {
        var state = _a.state, dispatch = _a.dispatch;
        return (React.createElement(React.Fragment, null,
            React.createElement(Button, { type: "button", disabled: !liftListItem(state.schema.nodes.list_item)(state), onClick: function () {
                    liftListItem(state.schema.nodes.list_item)(state, dispatch);
                } },
                React.createElement(Undent, { style: { width: '24px', height: '24px' } })),
            React.createElement(Button, { type: "button", disabled: !sinkListItem(state.schema.nodes.list_item)(state), onClick: function () {
                    sinkListItem(state.schema.nodes.list_item)(state, dispatch);
                } },
                React.createElement(Indent, { style: { width: '24px', height: '24px' } }))));
    };
    return BulletList;
}(Extension));
export default BulletList;
//# sourceMappingURL=bullet-list.js.map