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
        'Mod-Enter': (p1: EditorState<any>, p2?: (tr: import("prosemirror-state").Transaction<any>) => void, p3?: import("prosemirror-view").EditorView<any>) => boolean;
        'Shift-Enter': (p1: EditorState<any>, p2?: (tr: import("prosemirror-state").Transaction<any>) => void, p3?: import("prosemirror-view").EditorView<any>) => boolean;
        'Ctrl-Enter': (p1: EditorState<any>, p2?: (tr: import("prosemirror-state").Transaction<any>) => void, p3?: import("prosemirror-view").EditorView<any>) => boolean;
        'Mod-_': (state: any, dispatch: any) => boolean;
        'Tab': any;
        'Shift-Tab': any;
    };
}
