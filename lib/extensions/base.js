"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var paragraph_1 = require("./paragraph");
var trash_1 = require("./trash");
var move_up_1 = require("./move-up");
var move_down_1 = require("./move-down");
var default_keys_1 = require("./default-keys");
var default_plugins_1 = require("./default-plugins");
exports.default = [
    // blocks
    new paragraph_1.default(),
    new move_down_1.default(),
    new move_up_1.default(),
    new trash_1.default(),
    new default_keys_1.default(),
    new default_plugins_1.default()
];
//# sourceMappingURL=base.js.map