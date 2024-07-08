---
title: Customize
date: "2015-05-01T22:12:03.284Z"
description: "Customize"
---

Acutually, You can build your own Extension.
Here is the Extension interface!

```ts
export declare abstract class Extension {
    constructor(props: ExtensionProps);
    name: string;
    customName?: string;
    schema?: ExtensionSchema;
    customSchema?: ExtensionSchema;
    schemaDependencies?: {
        [key: string]: ExtensionSchema;
    };
    customProps?: {
        [key: string]: any;
    };
    tagName?: string;
    className?: string;
    customMenu?({ state, dispatch }: {
        state: EditorState;
        dispatch: Dispatch;
    }): JSX.Element | null;
    customInlineMenu?({ state, dispatch }: {
        state: EditorState;
        dispatch: Dispatch;
    }): JSX.Element | null;
    customLayout?(props: CustomLayoutProps, dom: HTMLElement): JSX.Element | null;
    customButton?({ state, dispatch }: {
        state: EditorState;
        dispatch: Dispatch;
    }): JSX.Element | null;
    customIcon?: JSX.Element | string | null;
    icon?: JSX.Element | string | null;
    plugins?: Plugin<any>[];
    showMenu: boolean;
    hideMenuOnFocus?: boolean;
    hideBlockMenuOnFocus?: boolean;
    hideInlineMenuOnFocus?: boolean;
    group?: string;
    view?(node: Node, view: EditorView, getPos: () => number): NodeView;
    active?(state: EditorState): boolean;
    enable?(state: EditorState): boolean;
    onClick?(state: EditorState, dispatch: Dispatch, view?: EditorView): void;
    keys?(schema: Schema): {
        [key: string]: any;
    };
    btnColor?: 'black' | 'white';
}
```

### ProseMirror


SmartBlock deeply depends on [ProseMirror](https://prosemirror.net/), so You may also want to know about [ProseMirror](https://prosemirror.net/) to
