import * as React from 'react'

const SvgTopRemove = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="25px" height="25px" viewBox="0 0 25 25" {...props}>
    <title>Group</title>
    <desc>Created with Sketch.</desc>
    <g id="Page-1" stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
      <g
        id="Group"
        transform="translate(12.500000, 11.000000) scale(1, -1) rotate(90.000000) translate(-12.500000, -11.000000) translate(5.500000, -1.500000)"
      >
        <rect
          id="Rectangle"
          fill="#333333"
          x={0}
          y={0}
          width={10}
          height={25}
          rx={2}
        />
        <rect
          id="Rectangle"
          stroke="#333333"
          fill="#FFFFFF"
          x={5.5}
          y={8.5}
          width={8}
          height={8}
          rx={4}
        />
        <rect
          id="Rectangle"
          fill="#333333"
          transform="translate(9.500000, 12.500000) rotate(90.000000) translate(-9.500000, -12.500000) "
          x={7}
          y={12}
          width={5}
          height={1}
        />
      </g>
    </g>
  </svg>
)

export default SvgTopRemove
