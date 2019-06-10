/// <reference types="react" />
import { Node, Schema } from 'prosemirror-model';
import { Plugin, EditorState, Transaction } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
interface ExtensionSchema {
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
export interface Extension {
    name: string;
    schema?: ExtensionSchema;
    schemaDependencies?: {
        [key: string]: ExtensionSchema;
    };
    customLayout?(props: CustomLayoutProps, dom: HTMLElement): JSX.Element;
    icon?: JSX.Element | string;
    plugins?: Plugin<any, any>[];
    showMenu: boolean;
    hideMenuOnFocus?: boolean;
    group?: string;
    render?(node: Node, view: EditorView, getPos: () => number): React.ReactNode;
    active?(state: EditorState): boolean;
    enable?(state: EditorState): boolean;
    onClick?(state: EditorState, dispatch: Dispatch, view?: EditorView): void;
    keys?(schema: Schema): {
        [key: string]: any;
    };
}
export {};
