import { useEffect, useMemo, useState } from 'react';
import { EditorState } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { getScrollTop } from '.';
export var useForceUpdate = function () {
    var _a = useState(0), setTick = _a[1];
    var update = function () {
        setTick(function (tick) { return tick + 1; });
    };
    return update;
};
export var useView = function (props) {
    var forceUpdate = useForceUpdate();
    var instance = useMemo(function () {
        var view = new EditorView(null, {
            state: EditorState.create(props.options),
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
export var useScroll = function () {
    var _a = useState(getScrollTop()), scrollTop = _a[0], setScrollTop = _a[1];
    useEffect(function () {
        var scrollEvent = function () {
            setScrollTop(getScrollTop());
        };
        window.addEventListener('scroll', scrollEvent);
        return function () {
            window.removeEventListener('scroll', scrollEvent);
        };
    }, [scrollTop]);
    return scrollTop;
};
export var useScrolling = function (element, delay) {
    var _a = useState(false), scrolling = _a[0], setScrolling = _a[1];
    useEffect(function () {
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