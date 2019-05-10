import { Node, Schema } from "prosemirror-model";
import { Plugin } from "prosemirror-state";

interface ExtensionSchema {
  content?: string,
  group?: string,
  parseDOM?: ({
    tag?: string
    style?: string
  })[],
  text?: string,
  toDOM?(node: Node): (string | {[key: string]: any} | number)[]
}

export interface Extension {
  name: string;
  schema: ExtensionSchema;
  icon?: JSX.Element | string;
  plugins?: (() => Plugin<any, any>)[];
  showMenu: boolean,
  keys?(schema: Schema): {[key: string]: any }
}