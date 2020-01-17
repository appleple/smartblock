---
title: Customize
date: "2015-05-01T22:12:03.284Z"
description: "Customize"
---

Acutually, You can build your own Extension.
Here is the Extension interface!

```ts
export abstract class Extension {
  
  constructor(props: ExtensionProps) {}

  name: string

  customName?: string

  schema?: ExtensionSchema

  customSchema?: ExtensionSchema

  schemaDependencies?: {
    [key: string]: ExtensionSchema;
  }

  customProps?: {
    [key: string]: any;
  }

  tagName?: string

  className?: string

  customMenu?({ state: EditorState, dispatch: Dispatch }): JSX.Element

  customInlineMenu?({ state: EditorState, dispatch: Dispatch }): JSX.Element

  customLayout?(props: CustomLayoutProps, dom: HTMLElement): JSX.Element

  customButton?({ state: EditorState, dispatch: Dispatch }): JSX.Element

  customIcon?: JSX.Element | string

  icon?: JSX.Element | string

  plugins?: Plugin<any, any>[]

  showMenu: boolean

  hideMenuOnFocus?: boolean

  hideBlockMenuOnFocus?: boolean

  hideInlineMenuOnFocus?: boolean

  group?: string

  // "edit" | "mark" | "block"
  view?(node: Node, view: EditorView, getPos: () => number): NodeView

  active?(state: EditorState): boolean

  enable?(state: EditorState): boolean

  onClick?(state: EditorState, dispatch: Dispatch, view?: EditorView): void

  keys?(schema: Schema): { [key: string]: any }

  btnColor?: 'black' | 'white'
}
```

### ProseMirror


SmartBlock deeply depends on [ProseMirror](https://prosemirror.net/), so You may also want to know about [ProseMirror](https://prosemirror.net/) to