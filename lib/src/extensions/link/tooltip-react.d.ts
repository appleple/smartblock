import * as React from 'react';
declare type TooltipReactProps = {
    style: React.CSSProperties;
    url: string;
    onClick(url: string): void;
};
declare type TooltipReactState = {
    newUrl: string;
    editing: boolean;
};
export default class TooltipReact extends React.Component<TooltipReactProps, TooltipReactState> {
    constructor(props: any);
    componentWillReceiveProps(nextProps: any, prevProps: any): void;
    enterUrl: () => void;
    render(): JSX.Element;
}
export {};
