import * as React from 'react';
import { setBlockType } from 'prosemirror-commands';
import { v4 as uuid } from 'uuid';
import AlignLeftIcon from '../components/icons/align-left';
import AlignCenterIcon from '../components/icons/align-center';
import AlignRightIcon from '../components/icons/align-right';
import { Dispatch, Extension, ExtensionProps } from '../types';
import { blockActive, getParentNodeFromState, getUniqId } from '../utils';
import Button from '../components/button';
import { CUSTOM_BLOCK_PRIORITY } from '../constants';
import { Node } from 'prosemirror-model';
import { EditorState } from 'prosemirror-state';

export default class CustomBlock extends Extension {
  constructor(props?: ExtensionProps) {
    if (!props.customName) {
      props.customName = getUniqId();
    }
    super(props);
  }

  // @ts-ignore
  get name() {
    return this.customName;
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
    const { tagName, className } = this;
    let tag = tagName;
    if (className) {
      tag += `.${className.replace(/\s/g, '.')}`;
    }

    return {
      content: 'inline*',
      group: 'block',
      defining: true,
      attrs: {
        align: { default: 'left' },
        id: { default: '' },
      },
      parseDOM: [
        {
          tag,
          priority: CUSTOM_BLOCK_PRIORITY,
          getAttrs(dom: HTMLElement) {
            return {
              id: dom.getAttribute('id') || uuid(),
            };
          },
        },
      ],
      toDOM: (node: Node) => {
        return [
          tagName,
          {
            style: `text-align: ${node.attrs.align}`,
            id: node.attrs.id || uuid(),
            class: className,
          },
          0,
        ];
      },
    };
  }

  // @ts-ignore
  get icon() {
    return this.customIcon;
  }

  active(state: EditorState) {
    return blockActive(state.schema.nodes[this.name])(state);
  }

  enable(state: EditorState) {
    return setBlockType(state.schema.nodes[this.name])(state);
  }

  customMenu({ state, dispatch }: { state: EditorState; dispatch: Dispatch }) {
    const node = getParentNodeFromState(state);
    return (
      <>
        <Button
          type="button"
          active={node && node.attrs.align === 'left'}
          onClick={() => {
            setBlockType(state.schema.nodes[this.name], {
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
            setBlockType(state.schema.nodes[this.name], {
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
            setBlockType(state.schema.nodes[this.name], {
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
    setBlockType(state.schema.nodes[this.name])(state, dispatch);
  }
}
