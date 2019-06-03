import * as React from 'react';
import { EditorView } from 'prosemirror-view';
declare const MenuBar: ({ menu, children, view, offsetTop }: {
    menu: any;
    children?: React.ReactChildren;
    view: EditorView<any>;
    offsetTop: number;
}) => JSX.Element;
export default MenuBar;
