"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var prosemirror_utils_1 = require("prosemirror-utils");
exports.deleteSelectionAtPos = function (state, pos, dispatch) {
    var resolvedPos = state.doc.resolve(pos);
    var rowNumber = resolvedPos.path[1];
    var i = 0;
    var firstNode = prosemirror_utils_1.findChildren(state.doc, function () {
        if (rowNumber === i) {
            i++;
            return true;
        }
        i++;
        return false;
    }, false)[0];
    var firstIndex = firstNode.pos;
    var removeTransaction = state.tr.delete(firstIndex, firstIndex + firstNode.node.content.size + 2);
    return removeTransaction;
};
exports.getNodeIndexFromPos = function (doc, pos) {
    var resolvedPos = doc.resolve(pos);
    var rowNumber = resolvedPos.path[1];
    return rowNumber;
};
exports.getPosFromIndex = function (doc, index) {
    var i = 0;
    var findNode = prosemirror_utils_1.findChildren(doc, function () {
        if (index === i) {
            i++;
            return true;
        }
        i++;
        return false;
    }, false)[0];
    return findNode.pos;
};
exports.hasClass = function (el, className) {
    if (el.classList) {
        return el.classList.contains(className);
    }
    else {
        return new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className);
    }
};
exports.readFiles = function (files) {
    var promiseArr = [];
    [].forEach.call(files, (function (f) {
        var promise = new Promise(function (resolve) {
            var objFileReader = new FileReader();
            if (f.type.match('image.*')) {
                objFileReader.onload = function () {
                    resolve({
                        file: f,
                        filetype: 'image',
                        preview: objFileReader.result
                    });
                };
                objFileReader.readAsDataURL(f);
            }
            else {
                objFileReader.onload = function () {
                    resolve({
                        file: f,
                        filetype: 'file'
                    });
                };
                objFileReader.readAsDataURL(f);
            }
            objFileReader.onerror = function () {
                resolve(null);
            };
        });
        promiseArr.push(promise);
    }));
    return Promise.all(promiseArr);
};
//# sourceMappingURL=util.js.map