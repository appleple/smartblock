/// <reference types="react" />
import { Extension, ExtensionProps } from '../types';
export default class StrikeThrough extends Extension {
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
            class: string;
        })[];
    };
    get icon(): JSX.Element;
    active(state: any): any;
    onClick(state: any, dispatch: any): void;
}
