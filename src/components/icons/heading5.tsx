import * as React from "react";

const SvgHeading5 = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width={1792}
    height={1792}
    viewBox="0 0 1792 1792"
    aria-labelledby={titleId}
    {...props}
  >
    {title === undefined ? (
      <title id={titleId}>{"\u898B\u51FA\u3057\uFF15"}</title>
    ) : title ? (
      <title id={titleId}>{title}</title>
    ) : null}
    <g id="a1846735-9b19-4829-a0f5-757abbb3a203" data-name="\u30E9\u30D9\u30EB">
      <path d="M818.8,1013H285.45v610.9H0V164.5H285.45V758.43H818.8V164.5h285.45V1623.87H818.8Z" />
      <path d="M1462.12,1172.91H1464q40.88-14.27,78.93-14.26,110.31,0,169.28,56.58t59,162.15q0,247.27-304.32,247.26-109.38,0-209.22-38l38-150.26q97,38,161.67,38,128.39,0,128.38-97,0-76.08-80.83-76.08-30.45,0-66.57,33.28H1276.68l19-413.68h442.21v152.16h-271Z" />
    </g>
  </svg>
);

export default SvgHeading5;
