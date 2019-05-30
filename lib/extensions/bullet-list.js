import * as React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faList, faOutdent, faIndent } from '@fortawesome/fontawesome-free-solid';
import { wrapInList, sinkListItem } from 'prosemirror-schema-list';
import uuid from 'uuid';
import { liftListItem } from '../utils';
import { blockActive } from '../utils';
import Button from '../components/button';
var BulletList = /** @class */ (function () {
    function BulletList() {
    }
    Object.defineProperty(BulletList.prototype, "name", {
        get: function () {
            return 'bullet_list';
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
            return {
                content: 'list_item+',
                group: 'block',
                parseDOM: [{ tag: "ul", getAttrs: function (dom) {
                            return {
                                id: dom.getAttribute('id')
                            };
                        } }],
                attrs: {
                    id: { default: '' }
                },
                toDOM: function (node) {
                    return ["ul", {
                            id: node.attrs.id || uuid()
                        }, 0];
                }
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BulletList.prototype, "icon", {
        get: function () {
            return React.createElement(FontAwesomeIcon, { icon: faList });
        },
        enumerable: true,
        configurable: true
    });
    BulletList.prototype.active = function (state) {
        return blockActive(state.schema.nodes.bullet_list)(state);
    };
    BulletList.prototype.enable = function (state) {
        return wrapInList(state.schema.nodes.bullet_list)(state);
    };
    BulletList.prototype.onClick = function (state, dispatch) {
        wrapInList(state.schema.nodes.bullet_list)(state, dispatch);
    };
    BulletList.prototype.customMenu = function (_a) {
        var state = _a.state, dispatch = _a.dispatch;
        return (React.createElement(React.Fragment, null,
            React.createElement(Button, { onClick: function () {
                    liftListItem(state.schema.nodes.list_item)(state, dispatch);
                } },
                React.createElement(FontAwesomeIcon, { icon: faOutdent })),
            React.createElement(Button, { onClick: function () {
                    sinkListItem(state.schema.nodes.list_item)(state, dispatch);
                } },
                React.createElement(FontAwesomeIcon, { icon: faIndent }))));
    };
    return BulletList;
}());
export default BulletList;
//# sourceMappingURL=bullet-list.js.map