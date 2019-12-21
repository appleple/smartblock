import { findChildren } from 'prosemirror-utils';
export var deleteSelectionAtPos = function (state, pos, dispatch) {
    var resolvedPos = state.doc.resolve(pos);
    var rowNumber = resolvedPos.path[1];
    var i = 0;
    var firstNode = findChildren(state.doc, function () {
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
export var getNodeIndexFromPos = function (doc, pos) {
    var resolvedPos = doc.resolve(pos);
    var rowNumber = resolvedPos.path[1];
    return rowNumber;
};
export var getPosFromIndex = function (doc, index) {
    var i = 0;
    var findNode = findChildren(doc, function () {
        if (index === i) {
            i++;
            return true;
        }
        i++;
        return false;
    }, false)[0];
    return findNode.pos;
};
export var hasClass = function (el, className) {
    if (el.classList) {
        return el.classList.contains(className);
    }
    else {
        return new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className);
    }
};
export var readFiles = function (files) {
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