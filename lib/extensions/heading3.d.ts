/// <reference types="react" />
import { Extension, ExtensionProps } from '../types';
export default class Heading3 extends Extension {
    constructor(props?: ExtensionProps);
    readonly name: string;
    readonly group: string;
    readonly showMenu: boolean;
    readonly schema: import("../types").ExtensionSchema | {
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
            class: any;
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
