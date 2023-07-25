import { Node, Schema } from 'prosemirror-model'
import { Plugin, EditorState, Transaction } from 'prosemirror-state'
import { EditorView, NodeView } from 'prosemirror-view'
import * as showdown from 'showdown'

export interface ExtensionSchema {
  content?: string;
  group?: string;
  parseDOM?: ({
    tag?: string;
    style?: string;
  })[];
  text?: string;
  toDOM?(node: Node): (string | { [key: string]: any } | number)[];
}

export type Dispatch = (tr: Transaction) => void

type CustomLayoutProps = {
  dispatch: Dispatch;
  state: EditorState;
}

export type ExtensionProps =
  {
      schema?: ExtensionSchema;
      className?: string;
      tagName?: string;
      icon?: JSX.Element | string;
      customName?: string;
    } & { [key: string]: any }
  | null

export abstract class Extension {
  constructor(props: ExtensionProps) {
    if (props) {
      this.className = props.className
      this.customSchema = props.schema
      this.tagName = props.tagName
      this.customIcon = props.icon
      this.customName = props.customName
    }
  }

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

  plugins?: Plugin<any>[]

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

type OutputJson = {
  [key: string]: any;
}

export type Output = {
  json: OutputJson;
  html: string;
  schema: Schema;
  markdown?: string;
}


export type AppProps = {
  onChange?(output: Output): void;
  onTitleChange?(title: string): void;
  onInit?(json: { schema: Schema }): void;
  json?: OutputJson;
  html?: string;
  markdown?: string;
  showdown?: showdown;
  extensions?: Extension[];
  showBackBtn?: boolean;
  autoSave?: boolean;
  showTitle?: boolean;
  titleText?: string;
  titlePlaceholder?: string;
  outputMarkdown?: boolean;
  full?: boolean;
  getEditorRef?(div: React.MutableRefObject<HTMLDivElement>): void;
}