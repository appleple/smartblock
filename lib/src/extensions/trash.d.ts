/// <reference types="react" />
import { Extension } from '../types';
export default class Trash implements Extension {
    readonly name: string;
    readonly showMenu: boolean;
    readonly schema: {
        group: string;
    };
    readonly icon: JSX.Element;
    onClick(state: any, dispatch: any): void;
}
