import * as React from 'react';
import { EditorView } from 'prosemirror-view';
declare const MenuBar: ({ menu, blockMenu, children, view }: {
    menu: any;
    blockMenu: any;
    children?: React.ReactChildren;
    view: EditorView;
}) => JSX.Element;
export default MenuBar;
