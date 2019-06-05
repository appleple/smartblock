import * as React from "react";

const SvgRightRemove = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="25px" height="25px" viewBox="0 0 25 25" {...props}>
    <title>{"Group"}</title>
    <desc>{"Created with Sketch."}</desc>
    <g id="Page-1" stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
      <g id="Group" transform="translate(6.000000, 0.000000)">
        <rect
          id="Rectangle"
          fill="#333333"
          x={0}
          y={0}
          width={10}
          height={25}
          rx={2}
        />
        <rect
          id="Rectangle"
          stroke="#333333"
          fill="#FFFFFF"
          x={5.5}
          y={8.5}
          width={8}
          height={8}
          rx={4}
        />
        <rect id="Rectangle" fill="#333333" x={7} y={12} width={5} height={1} />
      </g>
    </g>
  </svg>
);

export default SvgRightRemove;
