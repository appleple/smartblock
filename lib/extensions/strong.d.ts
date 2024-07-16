import * as React from 'react';
import { Extension, ExtensionProps } from '../types';
export default class Strong extends Extension {
    constructor(props?: ExtensionProps);
    get name(): string;
    get group(): string;
    get showMenu(): boolean;
    get schema(): import("../types").ExtensionSchema | {
        group: string;
        parseDOM: {
            tag: string;
            priority: string;
            style: string;
        }[];
        toDOM: () => (string | {
            style: string;
        })[];
    };
    get icon(): React.JSX.Element;
    active(state: any): boolean;
    onClick(state: any, dispatch: any): void;
}
