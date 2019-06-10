/// <reference types="react" />
import { Extension } from "../types";
export default class Test implements Extension {
    readonly name: string;
    readonly showMenu: boolean;
    readonly group: string;
    readonly hideMenuOnFocus: boolean;
    readonly schema: {
        content: string;
        group: string;
        selectable: boolean;
        attrs: {
            src: {
                default: string;
            };
            media_id: {
                default: string;
            };
            size: {
                default: string;
            };
            id: {
                default: string;
            };
        };
        parseDOM: {
            tag: string;
            getAttrs(dom: any): {
                src: any;
                id: any;
                media_id: any;
            };
        }[];
        toDOM(node: any): (string | {
            contenteditable: boolean;
            "class": string;
        } | (string | {
            src: any;
            size: any;
            id: any;
            "data-media_id": any;
        })[])[];
    };
    readonly icon: JSX.Element;
    active(state: any): boolean;
    enable(state: any): boolean;
    customLayout({ state, dispatch }: {
        state: any;
        dispatch: any;
    }, dom: any): JSX.Element;
}
