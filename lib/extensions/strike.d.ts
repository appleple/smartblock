/// <reference types="react" />
import { Extension, ExtensionSchema } from '../types';
export default class StrikeThrough extends Extension {
    constructor(schema?: ExtensionSchema);
    readonly name: string;
    readonly group: string;
    readonly showMenu: boolean;
    readonly schema: ExtensionSchema;
    readonly icon: JSX.Element;
    active(state: any): any;
    onClick(state: any, dispatch: any): void;
}
