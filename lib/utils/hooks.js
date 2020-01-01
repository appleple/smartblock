"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var prosemirror_state_1 = require("prosemirror-state");
var prosemirror_view_1 = require("prosemirror-view");
var _1 = require(".");
exports.useForceUpdate = function () {
    var _a = react_1.useState(0), setTick = _a[1];
    var update = function () {
        setTick(function (tick) { return tick + 1; });
    };
    return update;
};
exports.useView = function (props) {
    var forceUpdate = exports.useForceUpdate();
    var instance = react_1.useMemo(function () {
        var view = new prosemirror_view_1.EditorView(null, {
            state: prosemirror_state_1.EditorState.create(props.options),
            dispatchTransaction: function (transaction) {
                var _a = view.state.applyTransaction(transaction), state = _a.state, transactions = _a.transactions;
                view.updateState(state);
                if (transactions.some(function (tr) { return tr.docChanged; })) {
                    props.onChange(state, view.dispatch);
                }
                forceUpdate();
            },
            attributes: props.attributes,
            nodeViews: props.nodeViews
        });
        props.onChange(view.state, view.dispatch);
        return view;
    }, []);
    return instance;
};
exports.useScroll = function () {
    var _a = react_1.useState(_1.getScrollTop()), scrollTop = _a[0], setScrollTop = _a[1];
    react_1.useEffect(function () {
        var scrollEvent = function () {
            setScrollTop(_1.getScrollTop());
        };
        window.addEventListener('scroll', scrollEvent);
        return function () {
            window.removeEventListener('scroll', scrollEvent);
        };
    }, [scrollTop]);
    return scrollTop;
};
exports.useScrolling = function (element, delay) {
    var _a = react_1.useState(false), scrolling = _a[0], setScrolling = _a[1];
    react_1.useEffect(function () {
        var debounceTimer = null;
        var count = 0;
        var top = element.current.getBoundingClientRect().top;
        var eventHandler = function () {
            var localTop = element.current.getBoundingClientRect().top;
            if (localTop === top) {
                return;
            }
            top = localTop;
            count++;
            if (count === 3) {
                if (scrolling === false) {
                    count = 0;
                    setScrolling(true);
                }
            }
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(function () {
                setScrolling(false);
                count = 0;
            }, delay);
        };
        var interval = setInterval(eventHandler, 100);
        return function () {
            clearInterval(interval);
        };
    }, []);
    return scrolling;
};
//# sourceMappingURL=hooks.js.map