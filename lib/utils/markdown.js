"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var showdown = require("showdown");
exports.languageSupport = function () {
    function htmlunencode(text) {
        return (text
            .replace(/&amp;/g, '&')
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>'));
    }
    return [
        {
            type: 'output',
            filter: function (text, converter, options) {
                // use new shodown's regexp engine to conditionally parse codeblocks
                var left = '<pre><code\\b[^>]*>';
                var right = '</code></pre>';
                var flags = 'g';
                var replacement = function (wholeMatch, match, left, right) {
                    match = htmlunencode(match);
                    return left + match + right;
                };
                return showdown.helper.replaceRecursiveRegExp(text, replacement, left, right, flags);
            }
        }
    ];
};
//# sourceMappingURL=markdown.js.map