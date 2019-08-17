/// <reference types="react" />
import { Node, Schema } from 'prosemirror-model';
import { Plugin, EditorState, Transaction } from 'prosemirror-state';
import { EditorView, NodeView } from 'prosemirror-view';
export interface ExtensionSchema {
    content?: string;
    group?: string;
    parseDOM?: ({
        tag?: string;
        style?: string;
    })[];
    text?: string;
    toDOM?(node: Node): (string | {
        [key: string]: any;
    } | number)[];
}
export declare type Dispatch = (tr: Transaction<any>) => void;
declare type CustomLayoutProps = {
    dispatch: Dispatch;
    state: EditorState;
};
export declare type ExtensionProps = {
    schema?: ExtensionSchema;
    className?: string;
} | null;
export declare abstract class Extension {
    constructor(props: ExtensionProps);
    name: string;
    schema?: ExtensionSchema;
    customSchema?: ExtensionSchema;
    schemaDependencies?: {
        [key: string]: ExtensionSchema;
    };
    className?: string;
    customLayout?(props: CustomLayoutProps, dom: HTMLElement): JSX.Element;
    icon?: JSX.Element | string;
    plugins?: Plugin<any, any>[];
    showMenu: boolean;
    hideMenuOnFocus?: boolean;
    hideInlineMenuOnFocus?: boolean;
    group?: string;
    view?(node: Node, view: EditorView, getPos: () => number): NodeView;
    active?(state: EditorState): boolean;
    enable?(state: EditorState): boolean;
    onClick?(state: EditorState, dispatch: Dispatch, view?: EditorView): void;
    keys?(schema: Schema): {
        [key: string]: any;
    };
    btnColor?: 'black' | 'white';
}
export {};
