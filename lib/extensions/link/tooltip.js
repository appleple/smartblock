var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import * as React from 'react';
import { Plugin } from 'prosemirror-state';
import { render, unmountComponentAtNode } from 'react-dom';
import styled from 'styled-components';
import TooltipReact from './tooltip-react';
import { getScrollTop } from '../../utils';
var TooltipWrap = styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  position: absolute;\n  display: inline-block;\n  z-index: 1000;\n  background-color: #fff;\n  &:before {\n    position: absolute;\n    ", "\n    top: -12px;\n    content: '';\n    display: block;\n    border-style: solid;\n    border-width: 0 12px 12px 12px;\n    border-color: transparent transparent #ffffff transparent;\n  }\n"], ["\n  position: absolute;\n  display: inline-block;\n  z-index: 1000;\n  background-color: #fff;\n  &:before {\n    position: absolute;\n    ",
    "\n    top: -12px;\n    content: '';\n    display: block;\n    border-style: solid;\n    border-width: 0 12px 12px 12px;\n    border-color: transparent transparent #ffffff transparent;\n  }\n"])), function (props) { return "\n      left: " + props.pos + "px;\n    "; });
var useRef = React.useRef;
var ARROWOFFSET = 50;
var ARROWTOPOFFSET = 30;
var calculateStyle = function (view, container) {
    var selection = view.state.selection;
    var app = view.dom;
    var $anchor = view.state.selection.$anchor;
    var nodeAfter = $anchor.nodeAfter;
    var link = null;
    if (nodeAfter) {
        link = nodeAfter.marks.find(function (mark) {
            if (mark.type.name === 'link') {
                return true;
            }
        });
    }
    if (!selection || selection.empty || !app || !link) {
        return {
            left: -1000,
            top: 0
        };
    }
    var coords = view.coordsAtPos(selection.$head.pos);
    var top = coords.top + getScrollTop() + ARROWTOPOFFSET;
    var left = coords.left - ARROWOFFSET;
    var width = 320; // container.current.offsetWidth
    if (left + width > window.innerWidth) {
        return {
            top: top,
            left: window.innerWidth - width
        };
    }
    return {
        left: left,
        top: top
    };
};
var calculatePos = function (view, container) {
    var selection = view.state.selection;
    var app = view.dom;
    var $anchor = view.state.selection.$anchor;
    var nodeAfter = $anchor.nodeAfter;
    var link = null;
    if (nodeAfter) {
        link = nodeAfter.marks.find(function (mark) {
            if (mark.type.name === 'link') {
                return true;
            }
            return false;
        });
    }
    if (!selection || selection.empty || !app || !link) {
        return 20;
    }
    var coords = view.coordsAtPos(selection.$head.pos);
    var left = coords.left - ARROWOFFSET;
    var width = 320; // container.current.offsetWidth
    if (left + width > window.innerWidth) {
        return left - window.innerWidth + width;
    }
    return 20;
};
var TooltipComponent = function (props) {
    var view = props.view;
    var container = useRef(null);
    var style = calculateStyle(view, container);
    var selection = view.state.selection;
    var $anchor = selection.$anchor;
    var nodeBefore = $anchor.nodeBefore, nodeAfter = $anchor.nodeAfter, pos = $anchor.pos;
    var link = null;
    var editing = false;
    if (nodeAfter) {
        link = nodeAfter.marks.find(function (mark) {
            if (mark.type.name === 'link') {
                return true;
            }
        });
    }
    var url = '';
    if (link) {
        url = link.attrs.href;
    }
    if (link) {
        editing = link.attrs.editing;
    }
    var beforePos = selection.from;
    var afterPos = selection.to;
    if (beforePos === afterPos && nodeBefore && nodeAfter) {
        beforePos = pos - nodeBefore.nodeSize;
        afterPos = pos + nodeAfter.nodeSize;
    }
    var arrowPos = calculatePos(view, container);
    return (React.createElement(TooltipWrap, { className: "smartblock-tooltip", ref: container, style: style, pos: arrowPos },
        React.createElement(TooltipReact, { url: url, editing: editing, onClick: function (href) {
                var tr = view.state.tr;
                tr.removeMark(beforePos, afterPos, view.state.schema.marks.link);
                if (!href) {
                    view.dispatch(tr);
                    return;
                }
                tr.addMark(beforePos, afterPos, view.state.schema.marks.link.create({ href: href, editing: false }));
                view.dispatch(tr);
            } })));
};
var Tooltip = /** @class */ (function () {
    function Tooltip(view) {
        this.tooltip = document.createElement('div');
        document.body.appendChild(this.tooltip);
        this.update(view, null);
    }
    Tooltip.prototype.render = function (view) {
        render(React.createElement(TooltipComponent, { view: view }), this.tooltip);
    };
    Tooltip.prototype.update = function (view, oldState) {
        this.render(view);
    };
    Tooltip.prototype.destroy = function () {
        unmountComponentAtNode(this.tooltip);
        document.body.removeChild(this.tooltip);
    };
    return Tooltip;
}());
export default (function () {
    return new Plugin({
        view: function (view) {
            return new Tooltip(view);
        }
    });
});
var templateObject_1;
//# sourceMappingURL=tooltip.js.map