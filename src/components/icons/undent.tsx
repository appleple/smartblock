import * as React from "react";

const SvgUndent = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width={1792}
    height={1792}
    viewBox="0 0 1792 1792"
    aria-labelledby={titleId}
    {...props}
  >
    {title === undefined ? (
      <title id={titleId}>
        {
          "\u30A4\u30F3\u30C6\u3099\u30F3\u30C8\uFF08\u4E0B\u3051\u3099\u308B\uFF09"
        }
      </title>
    ) : title ? (
      <title id={titleId}>{title}</title>
    ) : null}
    <g id="a764fb61-3cf8-4b9f-a74f-23b3c42c41ce" data-name="\u30E9\u30D9\u30EB">
      <rect width={1792} height={256} />
      <rect x={768.29} y={512} width={1023.71} height={256} />
      <rect x={768.29} y={1024.39} width={1023.71} height={256} />
      <rect y={1536} width={1792} height={256} />
      <polygon points="512 901.03 512 1331.01 256 1116.02 0 901.03 256 686.04 512 471.05 512 901.03" />
    </g>
  </svg>
);

export default SvgUndent;
