import * as React from "react";

const SvgRemoveCol = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width={1792}
    height={1792}
    viewBox="0 0 1792 1792"
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <g data-name="\u30E9\u30D9\u30EB">
      <path d="M1199.55-.21h160v160h-160zM1359.55 1554.32h-160v-155h160zm0-232.43h-160V1167h160zm0-232.42h-160V934.53h160zm0-232.42h-160V702.11h160zm0-232.42h-160V469.68h160zm0-232.42h-160V237.26h160zM1199.55 1631.79h160v160h-160zM1108.12 1791.79H925.26v-160h182.86zm-274.28 0H651v-160h182.84zM399.55 1631.79h160v160h-160zM559.55 1554.32h-160v-155h160zm0-232.43h-160V1167h160zm0-232.42h-160V934.53h160zm0-232.42h-160V702.11h160zm0-232.42h-160V469.68h160zm0-232.42h-160V237.26h160zM399.55-.21h160v160h-160zM1108.12 159.79H925.27v-160h182.85zm-274.28 0H651v-160h182.84zM644.8 822.73h460v150h-460z" />
    </g>
  </svg>
);

export default SvgRemoveCol;
