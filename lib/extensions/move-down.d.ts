/// <reference types="react" />
import { Extension } from '../types';
export default class MoveDown implements Extension {
    get name(): string;
    get group(): string;
    get showMenu(): boolean;
    get icon(): JSX.Element;
    enable(state: any): boolean;
    onClick(_state: any, _dispatch: any, view: any): void;
}
