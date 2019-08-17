import { Schema } from 'prosemirror-model';
import { Extension, ExtensionProps } from '../types';
export default class ListItem extends Extension {
    constructor(props?: ExtensionProps);
    readonly name: string;
    readonly showMenu: boolean;
    readonly schema: import("../types").ExtensionSchema | {
        content: string;
        group: string;
        parseDOM: {
            tag: string;
            getAttrs(dom: any): {
                id: any;
            };
        }[];
        attrs: {
            id: {
                default: string;
            };
        };
        toDOM(node: any): (string | number | {
            id: any;
        })[];
        defining: boolean;
    };
    keys(schema: Schema): {
        Enter: (state: import("prosemirror-state").EditorState<Schema<any, any>>, dispatch?: (tr: import("prosemirror-state").Transaction<Schema<any, any>>) => void) => boolean;
        Tab: (state: import("prosemirror-state").EditorState<Schema<any, any>>, dispatch?: (tr: import("prosemirror-state").Transaction<Schema<any, any>>) => void) => boolean;
        'Shift-Tab': (p1: import("prosemirror-state").EditorState<any>, p2?: (tr: import("prosemirror-state").Transaction<any>) => void, p3?: import("prosemirror-view").EditorView<any>) => boolean;
    };
}
