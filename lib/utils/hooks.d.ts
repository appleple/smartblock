import * as React from 'react';
import { EditorState } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
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
export declare const useForceUpdate: () => () => void;
export declare const useView: (props: EditorProps) => EditorView<any>;
export {};
