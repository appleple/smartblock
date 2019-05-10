import { Extension } from '../types';
export default class Heading2 implements Extension {
    readonly name: string;
    readonly showMenu: boolean;
    readonly schema: {
        content: string;
        group: string;
        defining: boolean;
        parseDOM: {
            tag: string;
        }[];
        toDOM(node: any): (string | number)[];
    };
    readonly icon: JSX.Element;
    active(state: any): boolean;
    enable(state: any): boolean;
    onClick(state: any, dispatch: any): void;
}
