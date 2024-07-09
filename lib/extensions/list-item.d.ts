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
        Enter: import("prosemirror-state").Command;
        Tab: import("prosemirror-state").Command;
        'Shift-Tab': import("prosemirror-state").Command;
    };
}
