/// <reference types="react" />
import { Extension } from '../types';
export default class MoveUp implements Extension {
    readonly name: string;
    readonly group: string;
    readonly showMenu: boolean;
    readonly icon: JSX.Element;
    onClick(_state: any, _dispatch: any, view: any): void;
}
