/// <reference types="react" />
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
        }[];
        toDOM(): import("react").Key[];
        defining: boolean;
    };
    keys(schema: Schema): {
        'Enter': (state: import("prosemirror-state").EditorState<Schema<any, any>>, dispatch?: (tr: import("prosemirror-state").Transaction<Schema<any, any>>) => void) => boolean;
    };
}
