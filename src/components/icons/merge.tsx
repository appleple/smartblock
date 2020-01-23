import * as React from "react";

const SvgMerge = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width={1792}
    height={1792}
    viewBox="0 0 1792 1792"
    aria-labelledby={titleId}
    {...props}
  >
    {title === undefined ? (
      <title id={titleId}>{"merge01"}</title>
    ) : title ? (
      <title id={titleId}>{title}</title>
    ) : null}
    <g id="a6e86b8f-02bd-4744-89fd-00d642cba97e" data-name="\u30E9\u30D9\u30EB">
      <polygon points="896 0 896 633.99 960 576 960 100 1692 100 1692 1692 960 1692 960 1216 896 1158.01 896 1792 1792 1792 1792 0 896 0" />
      <polygon points="896 0 896 633.99 832 576 832 100 100 100 100 1692 832 1692 832 1216 896 1158.01 896 1792 0 1792 0 0 896 0" />
      <polygon points="1024 896 1384 1196 1384 596 1024 896" />
      <polygon points="768 896 408 1196 408 596 768 896" />
    </g>
  </svg>
);

export default SvgMerge;
