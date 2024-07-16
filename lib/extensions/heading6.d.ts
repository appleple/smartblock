import * as React from 'react';
import { Extension, ExtensionProps } from '../types';
export default class Heading6 extends Extension {
    constructor(props?: ExtensionProps);
    get name(): string;
    get group(): string;
    get showMenu(): boolean;
    get schema(): import("../types").ExtensionSchema | {
        content: string;
        group: string;
        defining: boolean;
        attrs: {
            align: {
                default: string;
            };
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
            style: string;
            id: any;
            class: any;
        } | {
            id: any;
            class: any;
            style?: undefined;
        })[];
    };
    get icon(): React.JSX.Element;
    active(state: any): boolean;
    enable(state: any): boolean;
    customMenu({ state, dispatch }: {
        state: any;
        dispatch: any;
    }): React.JSX.Element;
    onClick(state: any, dispatch: any): void;
}
