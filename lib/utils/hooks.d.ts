/// <reference types="react" />
import { EditorState } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
type EditorProps = {
    onChange(state: EditorState, dispatch: typeof EditorView.prototype.dispatch): any;
    attributes?: any;
    nodeViews?: any;
    autoFocus?: boolean;
    options: any;
    render?({ editor, view, scrolling, }: {
        editor: React.ReactNode;
        view: EditorView;
        scrolling: boolean;
    }): React.ReactElement;
};
export declare const useForceUpdate: () => () => void;
export declare const useView: (props: EditorProps) => EditorView;
export declare const useScroll: () => number;
export declare const useScrolling: (element: React.MutableRefObject<HTMLDivElement>, delay: number) => boolean;
export {};
