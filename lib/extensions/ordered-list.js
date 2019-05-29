import * as React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faListOl, faOutdent, faIndent } from '@fortawesome/fontawesome-free-solid';
import { wrapInList, sinkListItem } from 'prosemirror-schema-list';
import { liftListItem } from '../utils';
import { blockActive } from '../utils';
import Button from '../components/button';
var OrderedList = /** @class */ (function () {
    function OrderedList() {
    }
    Object.defineProperty(OrderedList.prototype, "name", {
        get: function () {
            return 'ordered_list';
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
            return {
                content: 'list_item+',
                group: 'block',
                parseDOM: [{ tag: "ol" }],
                toDOM: function () { return ["ol", 0]; }
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OrderedList.prototype, "icon", {
        get: function () {
            return React.createElement(FontAwesomeIcon, { icon: faListOl });
        },
        enumerable: true,
        configurable: true
    });
    OrderedList.prototype.active = function (state) {
        return blockActive(state.schema.nodes.ordered_list)(state);
    };
    OrderedList.prototype.enable = function (state) {
        return wrapInList(state.schema.nodes.ordered_list)(state);
    };
    OrderedList.prototype.onClick = function (state, dispatch) {
        wrapInList(state.schema.nodes.ordered_list)(state, dispatch);
    };
    OrderedList.prototype.customMenu = function (_a) {
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
    return OrderedList;
}());
export default OrderedList;
//# sourceMappingURL=ordered-list.js.map