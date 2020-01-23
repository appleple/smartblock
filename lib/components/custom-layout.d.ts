/// <reference types="react" />
import { EditorView } from 'prosemirror-view';
import { Extension } from '../types';
interface CustomLayoutProps {
    view: EditorView;
    menu: Extension[];
}
declare const _default: (props: CustomLayoutProps) => JSX.Element;
export default _default;
