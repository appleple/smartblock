import * as React from "react";

const SvgAlignCenter = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width={1792}
    height={1792}
    viewBox="0 0 1792 1792"
    aria-labelledby={titleId}
    {...props}
  >
    {title === undefined ? (
      <title id={titleId}>{"center"}</title>
    ) : title ? (
      <title id={titleId}>{title}</title>
    ) : null}
    <g id="bfe5ce98-ed3f-4197-9845-64f060ce92c6" data-name="\u30E9\u30D9\u30EB">
      <rect width={1792} height={256} />
      <rect x={320} y={512} width={1152} height={256} />
      <rect x={320} y={1536} width={1152} height={256} />
      <rect y={1024} width={1792} height={256} />
    </g>
  </svg>
);

export default SvgAlignCenter;
