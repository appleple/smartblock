import { Extension } from '../types';
export default class Underline implements Extension {
    readonly name: string;
    readonly showMenu: boolean;
    readonly schema: {
        group: string;
        parseDOM: ({
            tag: string;
            style?: undefined;
        } | {
            style: string;
            tag?: undefined;
        })[];
        toDOM: () => (string | {
            style: string;
        })[];
    };
    readonly icon: JSX.Element;
    active(state: any): any;
    onClick(state: any, dispatch: any): void;
}
