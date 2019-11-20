import * as React from 'react';
import { EditorState } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
declare type EditorProps = {
    onChange(state: EditorState, dispatch: typeof EditorView.prototype.dispatch): any;
    attributes?: any;
    nodeViews?: any;
    autoFocus?: boolean;
    options: any;
    render?({ editor: EditorState, view: EditorView, scrolling: boolean }: {
        editor: any;
        view: any;
        scrolling: any;
    }): React.ReactElement;
};
declare const _default: (props: EditorProps) => any;
export default _default;
