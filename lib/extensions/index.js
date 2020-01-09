"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var paragraph_1 = require("./paragraph");
var trash_1 = require("./trash");
var move_up_1 = require("./move-up");
var move_down_1 = require("./move-down");
var heading2_1 = require("./heading2");
var heading3_1 = require("./heading3");
var list_item_1 = require("./list-item");
var bullet_list_1 = require("./bullet-list");
var ordered_list_1 = require("./ordered-list");
var embed_1 = require("./embed");
var table_1 = require("./table");
var blockquote_1 = require("./blockquote");
var strong_1 = require("./strong");
var emphasis_1 = require("./emphasis");
var underline_1 = require("./underline");
var strike_1 = require("./strike");
var link_1 = require("./link");
var default_keys_1 = require("./default-keys");
var default_plugins_1 = require("./default-plugins");
exports.default = [
    // blocks
    new paragraph_1.default(),
    new heading2_1.default(),
    new heading3_1.default(),
    new list_item_1.default(),
    new bullet_list_1.default(),
    new ordered_list_1.default(),
    new embed_1.default(),
    // new Code(),
    new table_1.default(),
    new blockquote_1.default(),
    // marks
    new strong_1.default(),
    new emphasis_1.default(),
    new underline_1.default(),
    new strike_1.default(),
    new link_1.default(),
    // utility
    new move_down_1.default(),
    new move_up_1.default(),
    new trash_1.default(),
    // default
    new default_keys_1.default(),
    new default_plugins_1.default({
        placeholder: 'Content here...'
    })
];
//# sourceMappingURL=index.js.map