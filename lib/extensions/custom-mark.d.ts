/// <reference types="react" />
import { Dispatch, Extension, ExtensionProps } from '../types';
import { EditorState } from 'prosemirror-state';
export default class CustomMark extends Extension {
    constructor(props?: ExtensionProps);
    get name(): string;
    get group(): string;
    get showMenu(): boolean;
    get schema(): import("../types").ExtensionSchema | {
        group: string;
        parseDOM: {
            tag: string;
            priority: string;
        }[];
        toDOM: () => (string | number | {
            class: string;
        })[];
    };
    get icon(): string | JSX.Element;
    active(state: EditorState): boolean;
    onClick(state: EditorState, dispatch: Dispatch): void;
}
