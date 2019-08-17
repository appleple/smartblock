/// <reference types="react" />
import { Extension, ExtensionProps } from '../../types';
import { EditorState } from 'prosemirror-state';
export default class Embed extends Extension {
    constructor(props?: ExtensionProps);
    readonly name: string;
    readonly group: string;
    readonly showMenu: boolean;
    readonly hideInlineMenuOnFocus: boolean;
    readonly schema: import("../../types").ExtensionSchema | {
        group: string;
        content: string;
        selectable: boolean;
        isolating: boolean;
        attrs: {
            type: {
                default: string;
            };
            src: {
                default: string;
            };
        };
        parseDOM: {
            tag: string;
            getAttrs(dom: any): {
                src: any;
            };
        }[];
        toDOM: (node: any) => (string | {
            contenteditable: boolean;
            'class': string;
        } | (string | {
            'class': string;
        } | (string | {
            src: string;
        })[])[])[] | (string | {
            'class': string;
        } | (string | {
            'class': string;
            'href': any;
        } | (string | number | {
            'class': string;
        })[])[])[];
    };
    readonly icon: JSX.Element;
    active(state: any): boolean;
    enable(state: any): boolean;
    onClick(state: EditorState, dispatch: any): void;
    readonly plugins: import("prosemirror-state").Plugin<any, any>[];
}
