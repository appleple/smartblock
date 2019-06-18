import * as React from 'react';
import { Schema, DOMParser } from 'prosemirror-model'
import { Plugin } from 'prosemirror-state';
import { Decoration, DecorationSet } from 'prosemirror-view'
import { getHtmlFromNode } from '../utils';
import { useView } from '../utils/hooks';

const { useRef, useEffect } = React;
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

const placeholderPlugin = (text: string) => {
  return new Plugin({
    props: {
      decorations(state) {
        let doc = state.doc
        if (doc.childCount == 1 && doc.firstChild.isTextblock && doc.firstChild.content.size == 0) {
          return DecorationSet.create(doc, [Decoration.widget(1, document.createTextNode(text))])
        }
      }
    }
  })
}

type TitleProps = {
  placeholder: string,
  defaultValue: string,
  onChange(text: string): void
}

export default (props: TitleProps) => {
  const defaultProps = {
    placeholder: 'タイトルを入力してください',
    defaultValue: ''
  }
  props = Object.assign({}, defaultProps, props);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const schema = new Schema({ ...schemaDef } as any);
  const div = document.createElement('div')
  div.innerHTML = props.defaultValue
  const doc = DOMParser.fromSchema(schema).parse(div)

  const config = {
    onChange(state) {
      if (props.onChange) {
        props.onChange(getHtmlFromNode(state.doc, schema))
      }
    },
    options: {
      schema,
      doc,
      plugins: [
        placeholderPlugin(props.placeholder)
      ]
    },
  }
  
  useEffect(() => {
    titleRef.current.appendChild(view.dom);
  }, []);
  const view = useView(config);
  return (<div ref={titleRef} />)
}