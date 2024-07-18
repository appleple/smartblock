import * as React from 'react';
import { setBlockType } from 'prosemirror-commands';
import { v4 as uuid } from 'uuid';
import HeadingIcon from '../components/icons/heading4';
import AlignLeftIcon from '../components/icons/align-left';
import AlignCenterIcon from '../components/icons/align-center';
import AlignRightIcon from '../components/icons/align-right';
import { Dispatch, Extension, ExtensionProps } from '../types';
import { blockActive, getParentNodeFromState } from '../utils';
import Button from '../components/button';
import { BASE_PRIORITY } from '../constants';
import { Node } from 'prosemirror-model';
import { EditorState } from 'prosemirror-state';

export default class Heading4 extends Extension {
  constructor(props?: ExtensionProps) {
    super(props);
  }

  // @ts-ignore
  get name() {
    return 'heading4';
  }

  // @ts-ignore
  get group() {
    return 'block';
  }

  // @ts-ignore
  get showMenu() {
    return true;
  }

  // @ts-ignore
  get schema() {
    if (this.customSchema) {
      return this.customSchema;
    }

    return {
      content: 'inline*',
      group: 'block',
      defining: true,
      attrs: {
        align: { default: '' },
        id: { default: '' },
      },
      parseDOM: [
        {
          tag: 'h4',
          priority: BASE_PRIORITY,
          getAttrs(dom: HTMLElement) {
            return {
              id: dom.getAttribute('id') || uuid(),
            };
          },
        },
      ],
      toDOM(node: Node) {
        return [
          'h4',
          node.attrs.align
            ? {
                style: `text-align: ${node.attrs.align}`,
                id: node.attrs.id || uuid(),
                class: this.className,
              }
            : {
                id: node.attrs.id || uuid(),
                class: this.className,
              },
          0,
        ];
      },
    };
  }

  // @ts-ignore
  get icon() {
    return <HeadingIcon style={{ width: '24px', height: '24px' }} />;
  }

  active(state: EditorState) {
    return blockActive(state.schema.nodes.heading4)(state);
  }

  enable(state: EditorState) {
    return setBlockType(state.schema.nodes.heading4)(state);
  }

  customMenu({ state, dispatch }: { state: EditorState; dispatch: Dispatch }) {
    const node = getParentNodeFromState(state);
    return (
      <>
        <Button
          active={node && node.attrs.align === 'left'}
          type="button"
          onClick={() => {
            setBlockType(state.schema.nodes.heading4, {
              align: 'left',
            })(state, dispatch);
          }}
        >
          <AlignLeftIcon style={{ width: '24px', height: '24px' }} />
        </Button>
        <Button
          type="button"
          active={node && node.attrs.align === 'center'}
          onClick={() => {
            setBlockType(state.schema.nodes.heading4, {
              align: 'center',
            })(state, dispatch);
          }}
        >
          <AlignCenterIcon style={{ width: '24px', height: '24px' }} />
        </Button>
        <Button
          type="button"
          active={node && node.attrs.align === 'right'}
          onClick={() => {
            setBlockType(state.schema.nodes.heading4, {
              align: 'right',
            })(state, dispatch);
          }}
        >
          <AlignRightIcon style={{ width: '24px', height: '24px' }} />
        </Button>
      </>
    );
  }

  onClick(state: EditorState, dispatch: Dispatch) {
    setBlockType(state.schema.nodes.heading4)(state, dispatch);
  }
}
