import { Extension } from '../types';
export default class Strong implements Extension {
    readonly name: string;
    readonly showMenu: boolean;
    readonly schema: {
        group: string;
    };
    readonly icon: JSX.Element;
    onClick(state: any, dispatch: any): void;
}
