/// <reference types="react" />
import { Extension, ExtensionSchema } from '../types';
export default class Heading3 extends Extension {
    constructor(schema?: ExtensionSchema);
    readonly name: string;
    readonly group: string;
    readonly showMenu: boolean;
    readonly schema: ExtensionSchema | {
        content: string;
        group: string;
        defining: boolean;
        attrs: {
            align: {
                default: string;
            };
            id: {
                default: string;
            };
        };
        parseDOM: {
            tag: string;
            getAttrs(dom: any): {
                id: any;
            };
        }[];
        toDOM(node: any): (string | number | {
            style: string;
            id: any;
        })[];
    };
    readonly icon: JSX.Element;
    active(state: any): boolean;
    enable(state: any): boolean;
    customMenu({ state, dispatch }: {
        state: any;
        dispatch: any;
    }): JSX.Element;
    onClick(state: any, dispatch: any): void;
}
