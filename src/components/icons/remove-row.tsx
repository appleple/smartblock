import * as React from "react";

const SvgRemoveRow = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width={1792}
    height={1792}
    viewBox="0 0 1792 1792"
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <g data-name="\u30E9\u30D9\u30EB">
      <path d="M-18.45 415.79h160v160h-160zM1536.08 575.79h-154.95v-160h154.95zm-232.42 0h-155v-160h155zm-232.43 0H916.29v-160h154.94zm-232.42 0H683.87v-160h154.94zm-232.42 0H451.44v-160h155zm-232.42 0H219v-160h155zM1613.55 415.79h160v160h-160zM1773.55 1124.36h-160V941.5h160zm0-274.29h-160V667.22h160zM1613.55 1215.79h160v160h-160zM1536.08 1375.79h-154.95v-160h154.95zm-232.42 0h-155v-160h155zm-232.43 0H916.29v-160h154.94zm-232.42 0H683.87v-160h154.94zm-232.42 0H451.44v-160h155zm-232.42 0H219v-160h155zM-18.45 1215.79h160v160h-160zM141.55 1124.36h-160V941.5h160zm0-274.29h-160V667.22h160zM632.21 820.31h490v150h-490z" />
    </g>
  </svg>
);

export default SvgRemoveRow;
