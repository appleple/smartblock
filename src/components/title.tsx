import * as React from 'react';
import { Schema, DOMParser } from 'prosemirror-model';
import { EditorState } from 'prosemirror-state';
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

export default function Title (props: TitleProps) {
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
    onChange(state: EditorState) {
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
    let title: HTMLHeadingElement | null = null;
    if (titleRef.current && view !== null) {
      titleRef.current.appendChild(view.dom);
      title = titleRef.current;
    }
    return () => {
      if (title) {
        title.removeChild(view.dom);
      }
    }
    // view.dom を依存配列に含めるとタイトルが更新されない
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div ref={titleRef} className="smartblock-title" />;
};
