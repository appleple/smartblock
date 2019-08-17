/// <reference types="react" />
import { Extension, ExtensionProps } from '../types';
export default class Strong extends Extension {
    constructor(props?: ExtensionProps);
    readonly name: string;
    readonly group: string;
    readonly showMenu: boolean;
    readonly schema: import("../types").ExtensionSchema;
    readonly icon: JSX.Element;
    active(state: any): any;
    onClick(state: any, dispatch: any): void;
}
