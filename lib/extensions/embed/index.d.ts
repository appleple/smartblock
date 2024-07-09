/// <reference types="react" />
import { EditorState } from 'prosemirror-state';
import { Extension, ExtensionProps } from '../../types';
export default class Embed extends Extension {
    constructor(props?: ExtensionProps);
    get name(): string;
    get group(): string;
    get showMenu(): boolean;
    get hideInlineMenuOnFocus(): boolean;
    get schema(): import("../../types").ExtensionSchema | {
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
            class: string;
        } | (string | {
            class: string;
        } | (string | {
            src: string;
        })[])[])[] | (string | {
            class: string;
        } | (string | {
            class: string;
            href: any;
        } | (string | number | {
            class: string;
        })[])[])[];
    };
    get icon(): JSX.Element;
    active(state: any): boolean;
    enable(state: any): boolean;
    onClick(state: EditorState, dispatch: any): void;
    get plugins(): import("prosemirror-state").Plugin<any>[];
}
