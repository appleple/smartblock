import * as React from "react";

const SvgGoDown = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width={1792}
    height={1792}
    viewBox="0 0 1792 1792"
    aria-labelledby={titleId}
    {...props}
  >
    {title === undefined ? (
      <title id={titleId}>{"\u5165\u308C\u66FF\u3048\uFF08\u4E0A\uFF09"}</title>
    ) : title ? (
      <title id={titleId}>{title}</title>
    ) : null}
    <g id="a03b19b5-be1e-427a-b872-29e082246f7b" data-name="\u30E9\u30D9\u30EB">
      <polygon points="1344.19 1028.21 1007.61 1364.79 1007.61 709.94 784.4 709.94 784.4 1364.79 447.81 1028.21 289.98 1186.04 895.94 1792 896 1791.94 896.06 1792 1502.02 1186.04 1344.19 1028.21" />
      <rect width={1792} height={440} />
    </g>
  </svg>
);

export default SvgGoDown;
