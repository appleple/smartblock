import * as React from 'react';
import { EditorView } from 'prosemirror-view';
declare const MenuBar: ({ menu, blockMenu, children, view }: {
    menu: any;
    blockMenu: any;
    children?: React.ReactNode;
    view: EditorView;
}) => React.JSX.Element;
export default MenuBar;
