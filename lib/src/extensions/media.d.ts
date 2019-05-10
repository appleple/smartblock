import * as React from 'react';
import { Extension } from '../types';
export default class Media implements Extension {
    readonly name: string;
    readonly showMenu: boolean;
    readonly schema: {
        content: string;
        group: string;
        parseDOM: {
            tag: string;
        }[];
        toDOM(): React.Key[];
    };
    readonly icon: JSX.Element;
    onClick(state: any, dispatch: any): void;
    render(node: any): JSX.Element;
}
