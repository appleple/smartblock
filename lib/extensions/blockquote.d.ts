/// <reference types="react" />
import { Extension, ExtensionProps } from '../types';
export default class BlockQuote extends Extension {
    constructor(props?: ExtensionProps);
    readonly name: string;
    readonly group: string;
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
            align: {
                default: string;
            };
            id: {
                default: string;
            };
        };
        toDOM: (node: any) => (string | number | {
            class: string;
        })[];
    };
    readonly icon: JSX.Element;
    active(state: any): boolean;
    enable(state: any): boolean;
    onClick(state: any, dispatch: any): void;
}
