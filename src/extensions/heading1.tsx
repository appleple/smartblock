import * as React from 'react';
import { setBlockType } from 'prosemirror-commands';
import * as uuid from 'uuid/v4';
import HeadingIcon from '../components/icons/heading1';
import AlignLeftIcon from '../components/icons/align-left';
import AlignCenterIcon from '../components/icons/align-center';
import AlignRightIcon from '../components/icons/align-right';
import { Extension, ExtensionProps } from '../types';
import { blockActive, getParentNodeFromState } from '../utils';
import Button from '../components/button';
import { BASE_PRIORITY } from '../constants';

export default class Heading1 extends Extension {
  constructor(props?: ExtensionProps) {
    super(props);
  }

  // @ts-ignore
  get name() {
    return 'heading1';
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
          tag: 'h1',
          priority: BASE_PRIORITY,
          getAttrs(dom) {
            return {
              id: dom.getAttribute('id') || uuid(),
            };
          },
        },
      ],
      toDOM: (node) => {
        return [
          'h1',
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

  active(state) {
    return blockActive(state.schema.nodes.heading1)(state);
  }

  enable(state) {
    return setBlockType(state.schema.nodes.heading1)(state);
  }

  customMenu({ state, dispatch }) {
    const node = getParentNodeFromState(state);
    return (
      <>
        <Button
          active={node && node.attrs.align === 'left'}
          type="button"
          onClick={() => {
            setBlockType(state.schema.nodes.heading1, {
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
            setBlockType(state.schema.nodes.heading1, {
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
            setBlockType(state.schema.nodes.heading1, {
              align: 'right',
            })(state, dispatch);
          }}
        >
          <AlignRightIcon style={{ width: '24px', height: '24px' }} />
        </Button>
      </>
    );
  }

  onClick(state, dispatch) {
    setBlockType(state.schema.nodes.heading1)(state, dispatch);
  }
}
