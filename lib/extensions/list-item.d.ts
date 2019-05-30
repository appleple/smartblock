import { Extension } from '../types';
import { Schema } from "prosemirror-model";
export default class ListItem implements Extension {
    readonly name: string;
    readonly showMenu: boolean;
    readonly schema: {
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
        'Enter': (state: import("prosemirror-state").EditorState<Schema<any, any>>, dispatch?: (tr: import("prosemirror-state").Transaction<Schema<any, any>>) => void) => boolean;
        'Tab': (state: import("prosemirror-state").EditorState<Schema<any, any>>, dispatch?: (tr: import("prosemirror-state").Transaction<Schema<any, any>>) => void) => boolean;
        'Shift-Tab': (p1: import("prosemirror-state").EditorState<any>, p2?: (tr: import("prosemirror-state").Transaction<any>) => void, p3?: import("prosemirror-view").EditorView<any>) => boolean;
    };
}
