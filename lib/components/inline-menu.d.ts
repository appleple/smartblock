import * as React from 'react';
import { EditorView } from 'prosemirror-view';
declare const MenuBar: ({ menu, children, view }: {
    menu: any;
    children?: React.ReactChildren;
    view: EditorView<any>;
}) => JSX.Element;
export default MenuBar;
