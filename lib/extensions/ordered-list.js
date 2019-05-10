"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_fontawesome_1 = require("@fortawesome/react-fontawesome");
var fontawesome_free_solid_1 = require("@fortawesome/fontawesome-free-solid");
var prosemirror_schema_list_1 = require("prosemirror-schema-list");
var util_1 = require("../util");
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
            return React.createElement(react_fontawesome_1.default, { icon: fontawesome_free_solid_1.faListOl });
        },
        enumerable: true,
        configurable: true
    });
    BulletList.prototype.active = function (state) {
        return util_1.blockActive(state.schema.nodes.ordered_list)(state);
    };
    BulletList.prototype.enable = function (state) {
        return prosemirror_schema_list_1.wrapInList(state.schema.nodes.ordered_list)(state);
    };
    BulletList.prototype.onClick = function (state, dispatch) {
        prosemirror_schema_list_1.wrapInList(state.schema.nodes.ordered_list)(state, dispatch);
    };
    return BulletList;
}());
exports.default = BulletList;
//# sourceMappingURL=ordered-list.js.map