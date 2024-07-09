import * as React from 'react';
import { Schema, DOMParser } from 'prosemirror-model';
import { getHtmlFromNode } from '../utils';
import { useView } from '../utils/hooks';
import { placeholderPlugin } from '../extensions/default-plugins';

const { useRef, useEffect } = React;
const schemaDef = {
  nodes: {
    doc: {
      content: 'block',
    },
    text: {
      group: 'inline',
    },
    title: {
      group: 'block',
      content: 'text*',
      selectable: false,
      parseDOM: [{ tag: 'h1' }],
      toDOM() {
        return ['h1', 0];
      },
    },
  },
};

type TitleProps = {
  defaultValue: string;
  placeholder?: string;
  onChange(text: string): void;
};

export default (props: TitleProps) => {
  const defaultProps = {
    defaultValue: '',
    placeholder: 'Type Title here',
  };
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
      plugins: [
        placeholderPlugin({
          placeholder: props.placeholder || defaultProps.placeholder,
        }),
      ],
    },
  };

  const view = useView(config);
  useEffect(() => {
    if (titleRef.current) {
      titleRef.current.appendChild(view.dom);
    }
  }, []);

  return <div ref={titleRef} className="smartblock-title" />;
};
