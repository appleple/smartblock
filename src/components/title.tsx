import * as React from 'react'
import { Schema, DOMParser } from 'prosemirror-model'
import { Plugin } from 'prosemirror-state'
import { Decoration, DecorationSet } from 'prosemirror-view'
import { getHtmlFromNode } from '../utils'
import { useView } from '../utils/hooks'

const { useRef, useEffect } = React
const schemaDef = {
  nodes: {
    doc: {
      content: 'block'
    },
    text: {
      group: 'inline'
    },
    title: {
      group: 'block',
      content: 'text*',
      selectable: false,
      parseDOM: [{ tag: 'h1' }],
      toDOM() {
        return ['h1', 0]
      }
    }
  }
}

const placeholderPlugin = () => {
  return new Plugin({
    props: {
      decorations: state => {
        const decorations = []
        const decorate = (node, pos) => {
          if (node.type.isBlock && node.childCount === 0) {
            decorations.push(
              Decoration.node(pos, pos + node.nodeSize, {
                class: 'empty-node',
              })
            )
          }
        }
        state.doc.descendants(decorate)
        return DecorationSet.create(state.doc, decorations)
      },
    },
  })
}

type TitleProps = {
  placeholder: string;
  defaultValue: string;
  onChange(text: string): void;
}

export default (props: TitleProps) => {
  const defaultProps = {
    placeholder: 'Title here...',
    defaultValue: ''
  }
  props = Object.assign({}, defaultProps, props);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const schema = new Schema({ ...schemaDef } as any);
  const div = document.createElement('div');
  div.innerHTML = props.defaultValue;
  const doc = DOMParser.fromSchema(schema).parse(div);

  const config = {
    onChange(state) {
      if (props.onChange) {
        let title = getHtmlFromNode(state.doc, schema);
        title = title.replace(/<h1>(.*)<\/h1>/, '$1');
        props.onChange(title);
      }
    },
    options: {
      schema,
      doc,
      plugins: [placeholderPlugin()]
    }
  }

  const view = useView(config)
  useEffect(() => {
    titleRef.current.appendChild(view.dom)
  }, []);
  
  return <div ref={titleRef} />
}
