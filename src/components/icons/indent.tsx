import * as React from "react";

const SvgIndent = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width={1792}
    height={1792}
    viewBox="0 0 1792 1792"
    aria-labelledby={titleId}
    {...props}
  >
    {title === undefined ? (
      <title id={titleId}>{"\u30A4\u30F3\u30C6\u3099\u30F3\u30C8"}</title>
    ) : title ? (
      <title id={titleId}>{title}</title>
    ) : null}
    <g id="ac1ed596-8266-4a57-ae73-f333649eaa23" data-name="\u30E9\u30D9\u30EB">
      <rect width={1792} height={256} />
      <rect x={768} y={512} width={1024} height={256} />
      <rect x={768} y={1024.39} width={1024} height={256} />
      <rect y={1536} width={1792} height={256} />
      <polygon points="0.14 897.51 0.14 467.54 256.13 682.52 512.13 897.51 256.13 1112.5 0.14 1327.49 0.14 897.51" />
    </g>
  </svg>
);

export default SvgIndent;
