/// <reference types="react" />
import { Extension, Dispatch } from '../../types';
import { EditorState } from 'prosemirror-state';
type Props = {
    imgClassName?: string;
    imgFullClassName?: string;
    captionClassName?: string;
    withCaption?: boolean;
    onChange?: (preview: string, file: File) => Promise<string>;
};
export default class Image extends Extension {
    imgClassName: string;
    imgFullClassName: string;
    captionClassName: string;
    withCaption: boolean;
    onChange: (preview: string, file: File) => Promise<string>;
    constructor({ imgClassName, imgFullClassName, captionClassName, withCaption, onChange }: Props);
    get name(): string;
    get showMenu(): boolean;
    get group(): string;
    get hideBlockMenuOnFocus(): boolean;
    get schema(): {
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
            class: string;
        } | (string | {
            src: any;
            class: string;
        })[] | (string | number | {
            class: string;
        })[])[];
    };
    get icon(): JSX.Element;
    get plugins(): import("prosemirror-state").Plugin<any, any>[];
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
export {};
