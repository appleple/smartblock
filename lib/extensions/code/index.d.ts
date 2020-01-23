import * as React from 'react';
import { Extension, ExtensionProps } from '../../types';
declare type Lang = {
    label: React.ReactNode;
    lang: string;
};
export default class Code extends Extension {
    defaultLang: string;
    langs: Lang[];
    constructor(props?: ExtensionProps);
    readonly name: string;
    readonly group: string;
    readonly showMenu: boolean;
    readonly hideInlineMenuOnFocus: boolean;
    readonly schema: import("../../types").ExtensionSchema | {
        content: string;
        group: string;
        parseDOM: {
            tag: string;
            getAttrs(dom: any): {
                id: any;
                lang: any;
            };
        }[];
        toDOM: (node: any) => (string | {
            id: any;
            className: string;
        } | (string | number | {
            class: any;
        })[])[];
        attrs: {
            id: {
                default: string;
            };
            lang: {
                default: string;
            };
        };
    };
    readonly icon: JSX.Element;
    active(state: any): boolean;
    enable(state: any): boolean;
    onClick(state: any, dispatch: any): void;
    customMenu({ state, dispatch }: {
        state: any;
        dispatch: any;
    }): JSX.Element;
    readonly plugins: import("prosemirror-state").Plugin<any, any>[];
}
export {};
