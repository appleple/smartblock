/// <reference types="react" />
import { Extension, ExtensionSchema } from '../types';
export default class Table extends Extension {
    constructor(schema?: ExtensionSchema);
    readonly name: string;
    readonly group: string;
    readonly showMenu: boolean;
    readonly schema: any;
    readonly schemaDependencies: any;
    readonly icon: JSX.Element;
    readonly plugins: any[];
    active(state: any): boolean;
    enable(state: any): boolean;
    onClick(state: any, dispatch: any): void;
    customMenu({ state, dispatch }: {
        state: any;
        dispatch: any;
    }): JSX.Element;
    keys(): {
        Tab: any;
        'Shift-Tab': any;
    };
}
