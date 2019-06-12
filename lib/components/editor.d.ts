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
    containerId: string;
    render?({ editor: EditorState, view: EditorView }: {
        editor: any;
        view: any;
    }): React.ReactNode;
};
export default class Editor extends React.Component<EditorProps> {
    view: EditorView;
    editorRef: React.RefObject<HTMLDivElement>;
    constructor(props: any);
    componentDidMount(): void;
    render(): {};
}
export {};
