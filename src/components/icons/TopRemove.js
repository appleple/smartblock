import React from "react";

const SvgTopRemove = props => (
  <svg width={25} height={25} {...props}>
    <g transform="matrix(0 -1 -1 0 25 18)" fill="none" fillRule="evenodd">
      <rect fill="#333" width={10} height={25} rx={2} />
      <rect
        stroke="#333"
        fill="#FFF"
        x={5.5}
        y={8.5}
        width={8}
        height={8}
        rx={4}
      />
      <path fill="#333" d="M10 10v5H9v-5z" />
    </g>
  </svg>
);

export default SvgTopRemove;
