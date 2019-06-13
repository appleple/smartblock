import * as React from 'react';
import { EditorState } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import 'prosemirror-view/style/prosemirror.css';
declare type EditorProps = {
    onChange(state: EditorState, dispatch: typeof EditorView.prototype.dispatch): any;
    attributes?: any;
    nodeViews?: any;
    autoFocus?: boolean;
    options: any;
    render?({ editor: EditorState, view: EditorView }: {
        editor: any;
        view: any;
    }): React.ReactElement;
};
declare const _default: (props: EditorProps) => JSX.Element;
export default _default;
