import { Extension } from '../types';
export default class Paragraph implements Extension {
    readonly name: string;
    readonly showMenu: boolean;
    readonly schema: {
        content: string;
        group: string;
        parseDOM: {
            tag: string;
        }[];
        toDOM: () => (string | number)[];
    };
    readonly icon: JSX.Element;
    active(state: any): boolean;
    enable(state: any): boolean;
    onClick(state: any, dispatch: any): void;
}
