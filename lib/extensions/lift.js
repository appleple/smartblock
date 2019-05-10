import * as React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faOutdent } from '@fortawesome/fontawesome-free-solid';
import { lift } from 'prosemirror-commands';
var Strong = /** @class */ (function () {
    function Strong() {
    }
    Object.defineProperty(Strong.prototype, "name", {
        get: function () {
            return 'lift';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Strong.prototype, "showMenu", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Strong.prototype, "schema", {
        get: function () {
            return {
                group: 'block'
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Strong.prototype, "icon", {
        get: function () {
            return React.createElement(FontAwesomeIcon, { icon: faOutdent });
        },
        enumerable: true,
        configurable: true
    });
    Strong.prototype.onClick = function (state, dispatch) {
        lift(state, dispatch);
    };
    return Strong;
}());
export default Strong;
//# sourceMappingURL=lift.js.map