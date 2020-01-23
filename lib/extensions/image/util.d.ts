import { EditorState } from 'prosemirror-state';
import { Transform } from 'prosemirror-transform';
export declare const deleteSelectionAtPos: (state: EditorState<any>, pos: any, dispatch: any) => Transform<any>;
export declare const getNodeIndexFromPos: (doc: import("prosemirror-model").Node<any>, pos: number) => any;
export declare const getPosFromIndex: (doc: import("prosemirror-model").Node<any>, index: number) => number;
export declare const hasClass: (el: HTMLElement, className: string) => boolean;
export declare const readFiles: (files: FileList) => Promise<any[]>;
