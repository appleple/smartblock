/// <reference types="react" />
declare type TooltipReactProps = {
    url: string;
    onClick(url: string): void;
    editing: boolean;
};
declare const _default: (props: TooltipReactProps) => JSX.Element;
export default _default;
