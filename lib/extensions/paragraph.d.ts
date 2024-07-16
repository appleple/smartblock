import * as React from 'react';
import { Extension, ExtensionProps } from '../types';
export default class Paragraph extends Extension {
    constructor(props?: ExtensionProps);
    get name(): string;
    get group(): string;
    get showMenu(): boolean;
    get schema(): import("../types").ExtensionSchema | {
        type: string;
        content: string;
        group: string;
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
                align: any;
            };
        }[];
        toDOM: (node: any) => (string | number | {
            style: string;
            id: any;
            class: string;
        } | {
            id: any;
            class: string;
            style?: undefined;
        })[];
    };
    get icon(): React.JSX.Element;
    active(state: any): boolean;
    enable(state: any): boolean;
    customMenu({ state, dispatch }: {
        state: any;
        dispatch: any;
    }): JSX.Element | null;
    onClick(state: any, dispatch: any): void;
}
