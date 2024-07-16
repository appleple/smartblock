import * as React from 'react';
import { EditorState } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
type EditorProps = {
    onChange(state: EditorState, dispatch: typeof EditorView.prototype.dispatch): any;
    attributes?: any;
    nodeViews?: any;
    autoFocus?: boolean;
    options: any;
    render?({ editor, view, }: {
        editor: React.ReactNode;
        view: EditorView;
    }): React.ReactElement;
    editorRef: React.MutableRefObject<HTMLDivElement | null>;
};
declare const _default: (props: EditorProps) => React.ReactElement<any, string | React.JSXElementConstructor<any>>;
export default _default;
