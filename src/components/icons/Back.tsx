import * as React from "react";

const SvgBack = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width={62} height={62} viewBox="0 0 62 62" {...props}>
    <defs>
      <filter
        id="\u9577\u65B9\u5F62_361"
        x={0}
        y={0}
        width={62}
        height={62}
        filterUnits="userSpaceOnUse"
      >
        <feOffset dy={3} in="SourceAlpha" />
        <feGaussianBlur stdDeviation={3} result="blur" />
        <feFlood floodOpacity={0.161} />
        <feComposite operator="in" in2="blur" />
        <feComposite in="SourceGraphic" />
      </filter>
    </defs>
    <g
      transform="matrix(1, 0, 0, 1, 0, 0)"
      filter="url(#\u9577\u65B9\u5F62_361)"
    >
      <rect
        id="\u9577\u65B9\u5F62_361-2"
        data-name="\u9577\u65B9\u5F62 361"
        width={44}
        height={44}
        rx={2}
        transform="translate(9 6)"
        fill="#f2f2f4"
      />
    </g>
  </svg>
);

export default SvgBack;
