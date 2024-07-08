import { Schema } from 'prosemirror-model';
import { Extension, ExtensionProps } from '../types';
export default class ListItem extends Extension {
    constructor(props?: ExtensionProps);
    get name(): string;
    get showMenu(): boolean;
    get schema(): import("../types").ExtensionSchema | {
        content: string;
        group: string;
        attrs: {
            id: {
                default: string;
            };
        };
        parseDOM: {
            tag: string;
            priority: string;
            getAttrs(dom: any): {
                id: any;
            };
        }[];
        toDOM(node: any): (string | number)[];
        defining: boolean;
    };
    keys(schema: Schema): {
        Enter: (state: import("prosemirror-state").EditorState<any>, dispatch?: (tr: import("prosemirror-state").Transaction<any>) => void) => boolean;
        Tab: (state: import("prosemirror-state").EditorState<any>, dispatch?: (tr: import("prosemirror-state").Transaction<any>) => void) => boolean;
        'Shift-Tab': (p1: import("prosemirror-state").EditorState<any>, p2?: (tr: import("prosemirror-state").Transaction<any>) => void, p3?: any) => boolean;
    };
}
