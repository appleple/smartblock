import * as React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faListOl } from '@fortawesome/fontawesome-free-solid';
import { wrapInList } from 'prosemirror-schema-list';
import { blockActive } from '../utils';
var BulletList = /** @class */ (function () {
    function BulletList() {
    }
    Object.defineProperty(BulletList.prototype, "name", {
        get: function () {
            return 'ordered_list';
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
                parseDOM: [{ tag: "ol" }],
                toDOM: function () { return ["ol", 0]; }
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BulletList.prototype, "icon", {
        get: function () {
            return React.createElement(FontAwesomeIcon, { icon: faListOl });
        },
        enumerable: true,
        configurable: true
    });
    BulletList.prototype.active = function (state) {
        return blockActive(state.schema.nodes.ordered_list)(state);
    };
    BulletList.prototype.enable = function (state) {
        return wrapInList(state.schema.nodes.ordered_list)(state);
    };
    BulletList.prototype.onClick = function (state, dispatch) {
        wrapInList(state.schema.nodes.ordered_list)(state, dispatch);
    };
    return BulletList;
}());
export default BulletList;
//# sourceMappingURL=ordered-list.js.map