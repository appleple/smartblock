import React from "react";

const SvgLeftRemove = props => (
  <svg width={25} height={25} {...props}>
    <g transform="translate(4)" fill="none" fillRule="evenodd">
      <rect fill="#333" x={4} width={10} height={25} rx={2} />
      <g transform="translate(0 8)">
        <rect
          stroke="#333"
          fill="#FFF"
          x={0.5}
          y={0.5}
          width={8}
          height={8}
          rx={4}
        />
        <path fill="#333" d="M2 4h5v1H2z" />
      </g>
    </g>
  </svg>
);

export default SvgLeftRemove;
