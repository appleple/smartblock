/// <reference types="react" />
import { Extension, ExtensionProps } from '../../types';
export default class Link extends Extension {
    constructor(props?: ExtensionProps);
    readonly name: string;
    readonly group: string;
    readonly showMenu: boolean;
    readonly schema: import("../../types").ExtensionSchema | {
        group: string;
        attrs: {
            href: {};
            editing: {
                default: boolean;
            };
            title: {
                default: any;
            };
        };
        inclusive: boolean;
        parseDOM: {
            tag: string;
            getAttrs(dom: any): {
                href: any;
                title: any;
            };
        }[];
        toDOM(node: any): (string | number | {
            href: any;
            title: any;
            class: string;
        })[];
    };
    readonly icon: JSX.Element;
    readonly plugins: import("prosemirror-state").Plugin<any, any>[];
    active(state: any): any;
    onClick(state: any, dispatch: any): boolean;
}
