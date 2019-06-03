import * as React from 'react';
import { EditorView } from 'prosemirror-view';
declare const MenuBar: ({ menu, children, view, offsetHeight }: {
    menu: any;
    children?: React.ReactChildren;
    view: EditorView<any>;
    offsetHeight: number;
}) => JSX.Element;
export default MenuBar;
