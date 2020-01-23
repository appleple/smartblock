import * as React from "react";

const SvgAlignRight = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width={1792}
    height={1792}
    viewBox="0 0 1792 1792"
    aria-labelledby={titleId}
    {...props}
  >
    {title === undefined ? (
      <title id={titleId}>{"right"}</title>
    ) : title ? (
      <title id={titleId}>{title}</title>
    ) : null}
    <g id="b944651b-fd76-4b8a-8459-b94e3d6fe7d4" data-name="\u30E9\u30D9\u30EB">
      <rect width={1792} height={256} />
      <rect x={640} y={512} width={1152} height={256} />
      <rect x={640} y={1536} width={1152} height={256} />
      <rect y={1024} width={1792} height={256} />
    </g>
  </svg>
);

export default SvgAlignRight;
