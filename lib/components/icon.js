import * as React from 'react';
import Svg from 'react-svg';
export default (function (props) {
    return (React.createElement(Svg, { src: props.src, beforeInjection: function (svg) {
            svg.setAttribute('style', "width: " + props.width + "px; height: " + props.height + "px");
        } }));
});
//# sourceMappingURL=icon.js.map