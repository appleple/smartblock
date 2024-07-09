import { EditorState } from 'prosemirror-state';
import { Extension } from '../types';
export default class DefaultKeys implements Extension {
    get name(): string;
    get showMenu(): boolean;
    keys(): {
        Enter: (state: EditorState, dispatch: any, view: any) => boolean;
        'Mod-z': import("prosemirror-state").Command;
        'Shift-Mod-z': import("prosemirror-state").Command;
        Backspace: import("prosemirror-state").Command;
        'Mod-y': import("prosemirror-state").Command;
        'Alt-ArrowUp': import("prosemirror-state").Command;
        'Alt-ArrowDown': import("prosemirror-state").Command;
        'Mod-BracketLeft': import("prosemirror-state").Command;
        Escape: import("prosemirror-state").Command;
        'Mod-Enter': import("prosemirror-state").Command;
        'Shift-Enter': import("prosemirror-state").Command;
        'Ctrl-Enter': import("prosemirror-state").Command;
        'Mod-_': (state: any, dispatch: any) => boolean;
        Tab: any;
        'Shift-Tab': any;
    };
}
