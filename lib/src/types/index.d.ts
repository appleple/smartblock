/// <reference types="react" />
import { Node, Schema } from "prosemirror-model";
import { Plugin, EditorState } from "prosemirror-state";
import { Transform } from "prosemirror-transform";
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
export interface Extension {
    name: string;
    schema: ExtensionSchema;
    icon?: JSX.Element | string;
    plugins?: (() => Plugin<any, any>)[];
    showMenu: boolean;
    render?(node: Node): React.ReactNode;
    active?(state: EditorState): boolean;
    enable?(state: EditorState): boolean;
    onClick?(state: EditorState, dispatch: Transform): void;
    keys?(schema: Schema): {
        [key: string]: any;
    };
}
export {};
