import * as React from 'react';
declare type TooltipReactProps = {
    url: string;
    onClick(url: string): void;
    editing: boolean;
};
declare type TooltipReactState = {
    newUrl: string;
};
export default class TooltipReact extends React.Component<TooltipReactProps, TooltipReactState> {
    static defaultProps: {
        editing: boolean;
    };
    constructor(props: any);
    componentWillReceiveProps(nextProps: any, prevProps: any): void;
    enterUrl: () => void;
    render(): JSX.Element;
}
export {};
