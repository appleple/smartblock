import * as React from 'react';
import { Extension, ExtensionProps } from '../../types';
type Lang = {
    label: React.ReactNode;
    lang: string;
};
export default class Code extends Extension {
    defaultLang: string;
    langs: Lang[];
    constructor(props?: ExtensionProps);
    get name(): string;
    get group(): string;
    get showMenu(): boolean;
    get hideInlineMenuOnFocus(): boolean;
    get schema(): import("../../types").ExtensionSchema | {
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
    get icon(): JSX.Element;
    active(state: any): boolean;
    enable(state: any): boolean;
    onClick(state: any, dispatch: any): void;
    customMenu({ state, dispatch }: {
        state: any;
        dispatch: any;
    }): JSX.Element;
    get plugins(): import("prosemirror-state").Plugin<any>[];
}
export {};
