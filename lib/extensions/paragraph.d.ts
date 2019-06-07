/// <reference types="react" />
import { Extension } from '../types';
export default class Paragraph implements Extension {
    readonly name: string;
    readonly group: string;
    readonly showMenu: boolean;
    readonly schema: {
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
            style: string;
            tabindex: string;
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
