import * as React from "react";

const SvgHeading2 = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width={1792}
    height={1792}
    viewBox="0 0 1792 1792"
    aria-labelledby={titleId}
    {...props}
  >
    {title === undefined ? (
      <title id={titleId}>{"\u898B\u51FA\u3057\uFF12"}</title>
    ) : title ? (
      <title id={titleId}>{title}</title>
    ) : null}
    <g id="aa20b165-3acd-433f-82f0-1d83abd1dec9" data-name="\u30E9\u30D9\u30EB">
      <path d="M818.8,1013H285.45v610.9H0V164.5H285.45V758.43H818.8V164.5h285.45V1623.87H818.8Z" />
      <path d="M1270.81,1456.45q134-101,201.08-162.57t88-98.54a157.52,157.52,0,0,0,21-79q0-75-85-75-75,0-195.08,75l-50-160.07q51-34,129-57t146.06-23q125,0,192.58,58.52T1786,1096.3q0,82-52,156.06t-203.08,202.09v2H1791v160.06H1270.81Z" />
    </g>
  </svg>
);

export default SvgHeading2;
