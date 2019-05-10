import * as React from 'react';
import { Extension } from '../types';
export default class Heading3 implements Extension {
    readonly name: string;
    readonly showMenu: boolean;
    readonly schema: {
        content: string;
        group: string;
        defining: boolean;
        parseDOM: {
            tag: string;
        }[];
        toDOM(node: any): React.Key[];
    };
    readonly icon: string;
    active(state: any): boolean;
    enable(state: any): boolean;
    onClick(state: any, dispatch: any): void;
}
