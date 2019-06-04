/// <reference types="react" />
import { Extension } from '../types';
export default class Heading3 implements Extension {
    readonly name: string;
    readonly group: string;
    readonly showMenu: boolean;
    readonly schema: {
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
