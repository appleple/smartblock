/// <reference types="react" />
import { Extension, ExtensionProps } from '../../types';
export default class Table extends Extension {
    constructor(props?: ExtensionProps);
    get name(): string;
    get group(): string;
    get showMenu(): boolean;
    get schema(): any;
    get schemaDependencies(): any;
    get icon(): JSX.Element;
    get hideBlockMenuOnFocus(): boolean;
    get plugins(): any[];
    active(state: any): boolean;
    enable(state: any): boolean;
    onClick(state: any, dispatch: any): void;
    customInlineMenu({ state, dispatch }: {
        state: any;
        dispatch: any;
    }): JSX.Element;
    customMenu({ state, dispatch }: {
        state: any;
        dispatch: any;
    }): JSX.Element;
    keys(): {
        Tab: any;
        'Shift-Tab': any;
    };
}
