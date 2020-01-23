import * as React from "react";

const SvgCheck = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width={21.722}
    height={21.722}
    viewBox="0 0 21.722 21.722"
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <path
      id="\u30D1\u30B9_52"
      data-name="\u30D1\u30B9 52"
      d="M0,0V9.2H17.521"
      transform="translate(1.414 13.803) rotate(-45)"
      fill="none"
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
    />
  </svg>
);

export default SvgCheck;
