/// <reference types="react" />
import { Extension, ExtensionSchema } from '../../types';
export default class Embed extends Extension {
    constructor(schema?: ExtensionSchema);
    readonly name: string;
    readonly group: string;
    readonly showMenu: boolean;
    readonly schema: ExtensionSchema | {
        group: string;
        content: string;
        selectable: boolean;
        isolating: boolean;
        attrs: {
            type: {
                default: string;
            };
            src: {
                default: string;
            };
        };
        parseDOM: {
            tag: string;
            getAttrs(dom: any): {
                src: any;
            };
        }[];
        toDOM: (node: any) => (string | {
            contenteditable: boolean;
            'class': string;
        } | (string | {
            'class': string;
        } | (string | {
            src: string;
        })[])[])[] | (string | {
            'class': string;
        } | (string | any[] | {
            'class': string;
            'href': any;
        })[])[];
    };
    readonly icon: JSX.Element;
    active(state: any): boolean;
    enable(state: any): boolean;
    onClick(state: any, dispatch: any): void;
}
