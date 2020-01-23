import * as React from "react";

const SvgLeftInsert = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width={1792}
    height={1792}
    viewBox="0 0 1792 1792"
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <g data-name="\u30E9\u30D9\u30EB">
      <path d="M1652.13 142.2v1512h-550v-1512h550m140-140h-830v1792h830V2.2zM.13 1633.2h160v160H.13zM160.13 1555.78H.13v-154.84h160zm0-232.26H.13v-154.84h160zm0-232.26H.13V936.42h160zm0-232.27H.13V704.15h160zm0-232.26H.13V471.89h160zm0-232.26H.13V239.63h160zM.13 2.2h160v160H.13zM627.28 162.2H471.56V2.2h155.72zm-233.57 0H238V2.2h155.71zM705.13 2.2h160v160h-160zM865.13 1555.78h-160v-154.84h160zm0-232.26h-160v-154.84h160zm0-232.26h-160V936.42h160zm0-232.27h-160V704.15h160zm0-232.26h-160V471.89h160zm0-232.26h-160V239.63h160zM705.13 1633.2h160v160h-160zM627.28 1793.2H471.56v-160h155.72zm-233.57 0H238v-160h155.71zM677.13 834.21h-165v-165h-150v165h-165v150h165v164.99h150V984.21h165v-150z" />
    </g>
  </svg>
);

export default SvgLeftInsert;
