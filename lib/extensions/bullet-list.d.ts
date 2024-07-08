/// <reference types="react" />
import { Extension, ExtensionProps } from '../types';
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
    get icon(): JSX.Element;
    get hideBlockMenuOnFocus(): boolean;
    active(state: any): boolean;
    enable(state: any): boolean;
    onClick(state: any, dispatch: any): boolean;
    customMenu({ state, dispatch }: {
        state: any;
        dispatch: any;
    }): JSX.Element;
}
