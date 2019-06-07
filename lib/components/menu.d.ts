import * as React from 'react';
import { EditorView } from 'prosemirror-view';
interface PositionProps {
    view: EditorView;
    menu: any;
}
interface PositionState {
    style: React.CSSProperties;
}
export default class Menu extends React.Component<PositionProps, PositionState> {
    menuRef: React.RefObject<HTMLDivElement>;
    constructor(props: any);
    calculateStyle(props: PositionProps): {
        left: number;
        top: number;
    } | {
        top: number;
        left?: undefined;
    };
    componentDidMount(): void;
    componentWillReceiveProps(nextProps: any): void;
    getActiveMenu(): JSX.Element;
    shouldRenderMenu(): boolean;
    render(): JSX.Element;
}
export {};
