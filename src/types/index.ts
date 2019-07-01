import { Node, Schema } from 'prosemirror-model'
import { Plugin, EditorState, Transaction } from 'prosemirror-state'
import { Transform } from 'prosemirror-transform'
import { EditorView, NodeView } from 'prosemirror-view'

export interface ExtensionSchema {
  content?: string
  group?: string
  parseDOM?: ({
    tag?: string
    style?: string
  })[]
  text?: string
  toDOM?(node: Node): (string | { [key: string]: any } | number)[]
}

export type Dispatch = (tr: Transaction<any>) => void

type CustomLayoutProps = {
  dispatch: Dispatch
  state: EditorState
}

export abstract class Extension {
  name: string
  schema?: ExtensionSchema
  customSchema?: ExtensionSchema
  schemaDependencies?: {
    [key: string]: ExtensionSchema
  }
  customLayout?(props: CustomLayoutProps, dom: HTMLElement): JSX.Element
  icon?: JSX.Element | string
  plugins?: Plugin<any, any>[]
  showMenu: boolean
  hideMenuOnFocus?: boolean
  hideInlineMenuOnFocus?: boolean
  group?: string // "edit" | "mark" | "block"
  view?(node: Node, view: EditorView, getPos: () => number): NodeView
  active?(state: EditorState): boolean
  enable?(state: EditorState): boolean
  onClick?(state: EditorState, dispatch: Dispatch, view?: EditorView): void
  keys?(schema: Schema): { [key: string]: any }
  btnColor?: 'black' | 'white'
}
