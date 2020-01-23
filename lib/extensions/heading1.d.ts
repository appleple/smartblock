/// <reference types="react" />
import { Extension, ExtensionProps } from '../types';
export default class Heading1 extends Extension {
    constructor(props?: ExtensionProps);
    readonly name: string;
    readonly group: string;
    readonly showMenu: boolean;
    readonly schema: import("../types").ExtensionSchema | {
        content: string;
        group: string;
        defining: boolean;
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
        toDOM(node: any): (string | number | {
            style: string;
            class: any;
        } | {
            class: any;
            style?: undefined;
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
