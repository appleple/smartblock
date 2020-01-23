import * as React from "react";

const SvgImage = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    x="0px"
    y="0px"
    width="1792px"
    height="1792px"
    viewBox="0 0 1792 1792"
    enableBackground="new 0 0 1792 1792"
    xmlSpace="preserve"
    {...props}
  >
    <g id="Guide" />
    <g id="Font" display="none" />
    <g id="\u5185\u5BB9">
      <g>
        <path d="M0,0.001V1792h1792V0.001H0z M1664,1664H128V128h1536V1664z" />
        <polygon points="1536,768 1280,512 768,1152 256,768 256,1536 1536,1536  " />
        <circle cx={640} cy={512} r={256} />
      </g>
    </g>
    <g id="\u30EC\u30A4\u30E4\u30FC_5" display="none" />
    <g id="Unicode" display="none">
      <text
        transform="matrix(1 0 0 1 422.876 964.2812)"
        display="inline"
        fill="#ED1E79"
        fontFamily="'ArialMT'"
        fontSize={256}
      >
        {"U+F72B"}
      </text>
    </g>
  </svg>
);

export default SvgImage;
