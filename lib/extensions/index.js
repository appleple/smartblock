"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var paragraph_1 = require("./paragraph");
var heading2_1 = require("./heading2");
var heading3_1 = require("./heading3");
var list_item_1 = require("./list-item");
var bullet_list_1 = require("./bullet-list");
var ordered_list_1 = require("./ordered-list");
var underline_1 = require("./underline");
var strike_1 = require("./strike");
var strong_1 = require("./strong");
var link_1 = require("./link");
var lift_1 = require("./lift");
var media_1 = require("./media");
exports.default = [
    //blocks
    new paragraph_1.default(),
    new heading2_1.default(),
    new heading3_1.default(),
    new list_item_1.default(),
    new bullet_list_1.default(),
    new ordered_list_1.default(),
    //marks
    new underline_1.default(),
    new strike_1.default(),
    new strong_1.default(),
    new link_1.default(),
    //utility
    new lift_1.default(),
    new media_1.default()
];
//# sourceMappingURL=index.js.map