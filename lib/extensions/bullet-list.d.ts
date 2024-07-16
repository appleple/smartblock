import * as React from 'react';
import { Dispatch, Extension, ExtensionProps } from '../types';
import { EditorState } from 'prosemirror-state';
export default class BulletList extends Extension {
    constructor(props?: ExtensionProps);
    get name(): string;
    get group(): string;
    get showMenu(): boolean;
    get schema(): {
        content: string;
        group: string;
        attrs: {
            id: {
                default: string;
            };
        };
        parseDOM: {
            tag: string;
            priority: string;
            getAttrs(dom: any): {
                id: any;
            };
        }[];
        toDOM(node: any): (string | number | {
            id: any;
            class: any;
        })[];
    };
    get icon(): React.JSX.Element;
    get hideBlockMenuOnFocus(): boolean;
    active(state: any): boolean;
    enable(state: any): boolean;
    onClick(state: any, dispatch: any): boolean;
    customMenu({ state, dispatch }: {
        state: EditorState;
        dispatch: Dispatch;
    }): React.JSX.Element;
}
