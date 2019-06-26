import { Extension } from '../types';
import { EditorState } from 'prosemirror-state';
import { joinUp, joinDown, lift, selectParentNode } from 'prosemirror-commands';
export default class DefaultKeys implements Extension {
    readonly name: string;
    readonly showMenu: boolean;
    keys(): {
        'Enter': (state: EditorState<any>, dispatch: any, view: any) => boolean;
        'Mod-z': any;
        'Shift-Mod-z': any;
        'Backspace': any;
        'Mod-y': any;
        'Alt-ArrowUp': typeof joinUp;
        'Alt-ArrowDown': typeof joinDown;
        'Mod-BracketLeft': typeof lift;
        'Escape': typeof selectParentNode;
        'Mod-Enter': <S extends import("prosemirror-model").Schema<any, any> = any>(p1: EditorState<S>, p2?: (tr: import("prosemirror-state").Transaction<S>) => void, p3?: import("prosemirror-view").EditorView<S>) => boolean;
        'Shift-Enter': <S extends import("prosemirror-model").Schema<any, any> = any>(p1: EditorState<S>, p2?: (tr: import("prosemirror-state").Transaction<S>) => void, p3?: import("prosemirror-view").EditorView<S>) => boolean;
        'Ctrl-Enter': <S extends import("prosemirror-model").Schema<any, any> = any>(p1: EditorState<S>, p2?: (tr: import("prosemirror-state").Transaction<S>) => void, p3?: import("prosemirror-view").EditorView<S>) => boolean;
        'Mod-_': (state: any, dispatch: any) => boolean;
        'Tab': any;
        'Shift-Tab': any;
    };
}
