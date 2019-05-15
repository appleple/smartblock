/// <reference types="react" />
import { Extension } from '../types';
export default class Heading3 implements Extension {
    readonly name: string;
    readonly showMenu: boolean;
    readonly schema: {
        content: string;
        group: string;
        defining: boolean;
        attrs: {
            align: {
                default: string;
            };
        };
        parseDOM: {
            tag: string;
        }[];
        toDOM(node: any): (string | number | {
            style: string;
        })[];
    };
    readonly icon: string;
    active(state: any): boolean;
    enable(state: any): boolean;
    customMenu({ state, dispatch }: {
        state: any;
        dispatch: any;
    }): JSX.Element;
    onClick(state: any, dispatch: any): void;
}
