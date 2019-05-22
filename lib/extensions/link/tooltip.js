import * as React from 'react';
import { Plugin } from "prosemirror-state";
import { render, unmountComponentAtNode } from "react-dom";
import TooltipReact from './tooltip-react';
import { getOffset } from '../../utils';
var calculateStyle = function (view) {
    var selection = view.state.selection;
    var app = document.querySelector('#container');
    var dom = view.domAtPos(selection.$anchor.pos);
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
    if (!selection || !app || !link) {
        return {
            left: -1000,
            top: 0
        };
    }
    var flag = dom.node instanceof Element;
    var element = flag ? dom.node : dom.node.parentElement;
    var elementTop = getOffset(element).top;
    var coords = view.coordsAtPos(selection.$anchor.pos);
    if (window.innerWidth <= 767) {
        return {
            left: 5,
            top: elementTop + element.offsetHeight
        };
    }
    return {
        left: coords.left,
        top: elementTop + element.offsetHeight
    };
};
var Tooltip = /** @class */ (function () {
    function Tooltip(view) {
        this.tooltip = document.createElement('div');
        document.body.appendChild(this.tooltip);
        this.update(view, null);
    }
    Tooltip.prototype.render = function (view) {
        var style = calculateStyle(view);
        var selection = view.state.selection;
        var $anchor = selection.$anchor;
        var nodeBefore = $anchor.nodeBefore, nodeAfter = $anchor.nodeAfter, pos = $anchor.pos;
        var link = null;
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
        var beforePos = selection.from;
        var afterPos = selection.to;
        if (beforePos === afterPos && nodeBefore && nodeAfter) {
            beforePos = pos - nodeBefore.nodeSize;
            afterPos = pos + nodeAfter.nodeSize;
        }
        render(React.createElement(TooltipReact, { style: style, url: url, onClick: function (href) {
                var tr = view.state.tr;
                tr.removeMark(beforePos, afterPos, view.state.schema.marks.link);
                tr.addMark(beforePos, afterPos, view.state.schema.marks.link.create({ href: href }));
                view.dispatch(tr);
            } }), this.tooltip);
    };
    Tooltip.prototype.update = function (view, oldState) {
        this.render(view);
    };
    Tooltip.prototype.destroy = function () {
        unmountComponentAtNode(this.tooltip);
        this.tooltip.remove();
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
//# sourceMappingURL=tooltip.js.map