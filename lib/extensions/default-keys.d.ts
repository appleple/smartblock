import { EditorState } from 'prosemirror-state';
import { joinUp, joinDown, lift, selectParentNode } from 'prosemirror-commands';
import { Extension } from '../types';
export default class DefaultKeys implements Extension {
    get name(): string;
    get showMenu(): boolean;
    keys(): {
        Enter: (state: EditorState<any>, dispatch: any, view: any) => boolean;
        'Mod-z': Command;
        'Shift-Mod-z': Command;
        Backspace: Command;
        'Mod-y': Command;
        'Alt-ArrowUp': typeof joinUp;
        'Alt-ArrowDown': typeof joinDown;
        'Mod-BracketLeft': typeof lift;
        Escape: typeof selectParentNode;
        'Mod-Enter': <S extends import("prosemirror-model").Schema<any, any> = any>(p1: EditorState<S>, p2?: (tr: import("prosemirror-state").Transaction<S>) => void, p3?: any) => boolean;
        'Shift-Enter': <S extends import("prosemirror-model").Schema<any, any> = any>(p1: EditorState<S>, p2?: (tr: import("prosemirror-state").Transaction<S>) => void, p3?: any) => boolean;
        'Ctrl-Enter': <S extends import("prosemirror-model").Schema<any, any> = any>(p1: EditorState<S>, p2?: (tr: import("prosemirror-state").Transaction<S>) => void, p3?: any) => boolean;
        'Mod-_': (state: any, dispatch: any) => boolean;
        Tab: any;
        'Shift-Tab': any;
    };
}
