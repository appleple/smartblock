import { Extension, ExtensionProps } from '../../types';
import CodeBlockView from './code-block-view';
export default class Code extends Extension {
    constructor(props?: ExtensionProps);
    readonly name: string;
    readonly group: string;
    readonly showMenu: boolean;
    readonly schema: import("../../types").ExtensionSchema | {
        content: string;
        group: string;
        parseDOM: {
            tag: string;
            getAttrs(dom: any): {
                id: any;
            };
        }[];
        toDOM: (node: any) => (string | (string | number)[] | {
            id: any;
            className: string;
        })[];
        attrs: {
            id: {
                default: string;
            };
        };
    };
    readonly icon: string;
    active(state: any): boolean;
    enable(state: any): boolean;
    onClick(state: any, dispatch: any): void;
    view(node: any, view: any, getPos: any): CodeBlockView;
}
