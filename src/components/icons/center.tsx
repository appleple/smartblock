import * as React from "react";

const SvgCenter = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width={1792}
    height={1792}
    viewBox="0 0 1792 1792"
    aria-labelledby={titleId}
    {...props}
  >
    {title === undefined ? (
      <title id={titleId}>{"\u4E2D\u592E\u8868\u793A"}</title>
    ) : title ? (
      <title id={titleId}>{title}</title>
    ) : null}
    <g id="f07ac816-8085-4bf9-bfd2-7a8e99a42502" data-name="\u30E9\u30D9\u30EB">
      <rect x={318.55} y={620.58} width={1152} height={546} />
      <rect x={174} y={-2.21} width={1444} height={181} />
      <rect x={174} y={309.79} width={1444} height={181} />
      <rect x={174} y={1296.79} width={1444} height={181} />
      <rect x={174} y={1608.79} width={1444} height={181} />
    </g>
  </svg>
);

export default SvgCenter;
