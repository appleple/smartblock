/// <reference types="react" />
import { EditorView } from 'prosemirror-view';
import { Extension } from '..';
interface PositionProps {
    view: EditorView;
    menu: Extension[];
}
declare const _default: (props: PositionProps) => JSX.Element;
export default _default;
