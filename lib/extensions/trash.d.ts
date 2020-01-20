/// <reference types="react" />
import { Extension } from '../types';
declare type Props = {
    i18n?: {
        remove_block: string;
    };
};
export default class Trash implements Extension {
    i18n: {
        remove_block: string;
    };
    constructor(props?: Props);
    readonly name: string;
    readonly group: string;
    readonly showMenu: boolean;
    readonly icon: JSX.Element;
    readonly btnColor: 'black';
    onClick(state: any, dispatch: any): void;
}
export {};
