/// <reference types="react" />
import { Extension, Dispatch } from '../../types';
import { EditorState } from 'prosemirror-state';
export default class Image extends Extension {
    imgClassName: string;
    imgFullClassName: string;
    captionClassName: string;
    onChange: (preview: string, file: File) => Promise<string>;
    constructor(props: any);
    readonly name: string;
    readonly showMenu: boolean;
    readonly group: string;
    readonly hideBlockMenuOnFocus: boolean;
    readonly schema: {
        content: string;
        isolating: boolean;
        group: string;
        selectable: boolean;
        attrs: {
            src: {
                default: string;
            };
            size: {
                default: string;
            };
            id: {
                default: string;
            };
            caption: {
                default: string;
            };
        };
        parseDOM: {
            tag: string;
            getAttrs(dom: any): {
                src?: undefined;
                id?: undefined;
                size?: undefined;
            } | {
                src: any;
                id: any;
                size: string;
            };
        }[];
        toDOM: (node: any) => (string | {
            "class": string;
        } | (string | {
            src: any;
            "class": string;
            id: any;
        })[] | (string | number | {
            "class": string;
        })[])[];
    };
    readonly icon: JSX.Element;
    readonly plugins: import("prosemirror-state").Plugin<any, any>[];
    changeImage(state: EditorState, dispatch: Dispatch, files: FileList): Promise<void>;
    customButton({ state, dispatch }: {
        state: any;
        dispatch: any;
    }): JSX.Element;
    customMenu({ state, dispatch }: {
        state: any;
        dispatch: any;
    }): JSX.Element;
    active(state: any): boolean;
    enable(state: any): boolean;
}
