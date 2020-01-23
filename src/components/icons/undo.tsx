import * as React from "react";

const SvgUndo = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width={1792}
    height={1792}
    viewBox="0 0 1792 1792"
    aria-labelledby={titleId}
    {...props}
  >
    {title === undefined ? (
      <title id={titleId}>{"undo"}</title>
    ) : title ? (
      <title id={titleId}>{title}</title>
    ) : null}
    <g id="bebf11ee-5e4c-414b-9c0e-9afbb64c0153" data-name="\u30E9\u30D9\u30EB">
      <path d="M715.62,1146.77v412.47L0,843.62,715.62,128V510.8l356.57,39.61c395.14,43.91,676.64,243.79,716.86,492,31.48,194.23-94.21,351.37-190.3,420.9-106.64,77.16-245,118.33-401.49,76.89,119.27-39.75,212.14-134.61,207.69-214.79-7-125.53-148.89-178.63-452-178.63Z" />
    </g>
  </svg>
);

export default SvgUndo;
