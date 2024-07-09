import { history } from 'prosemirror-history';
import { gapCursor } from 'prosemirror-gapcursor';
import { Plugin } from 'prosemirror-state';
import { Decoration, DecorationSet } from 'prosemirror-view';
import { Extension } from '../types';
import { Node } from 'prosemirror-model';

export const currentElementPlugin = () => {
  return new Plugin({
    props: {
      // @ts-ignore
      decorations(state) {
        const { selection } = state;
        const decorations = [];
        state.doc.nodesBetween(selection.from, selection.to, (node, position) => {
          if (node.isBlock) {
            decorations.push(
              Decoration.node(position, position + node.nodeSize, {
                class: 'selected',
              })
            );
          }
        });
        return DecorationSet.create(state.doc, decorations);
      },
    },
  });
};

interface PlaceholderPluginConfig {
  placeholder:
    | ((PlaceholderProps: {
        node: Node
        pos: number
        hasAnchor: boolean
      }) => string)
    | string;
  emptyNodeClass: string;
  emptyEditorClass: string;
}

interface PlaceholderPluginOptions extends Partial<PlaceholderPluginConfig> {}

const defaultPlaceholderOptions = {
  placeholder: 'Write something …',
  emptyNodeClass: 'empty-node',
  emptyEditorClass: 'empty-editor',
};

export const placeholderPlugin = (options: PlaceholderPluginOptions = {}) => {
  const config = { ...defaultPlaceholderOptions, ...options } as PlaceholderPluginConfig;
  return new Plugin({
    props: {
      // @ts-ignore
      decorations: (state) => {
        const decorations = [];
        const { doc, selection } = state;
        const { anchor } = selection;
        // only calculate isEmpty once due to its performance impacts
        const { firstChild } = doc.content
        const isLeaf = firstChild && firstChild.type.isLeaf
        const isAtom = firstChild && firstChild.isAtom
        const isValidNode = firstChild && firstChild.type.name === doc.type.contentMatch.defaultType?.name
        const isEmptyDoc = doc.content.childCount <= 1
          && firstChild
          && isValidNode
          && (firstChild.nodeSize <= 2 && (!isLeaf || !isAtom))
        const decorate = (node: Node, pos: number) => {
          const hasAnchor = anchor >= pos && anchor <= pos + node.nodeSize
          const isEmpty = !node.isLeaf && !node.childCount
          if (hasAnchor && isEmpty) {
            const classes = [config.emptyNodeClass]

            if (isEmptyDoc) {
              classes.push(config.emptyEditorClass)
            }
            decorations.push(
              Decoration.node(pos, pos + node.nodeSize, {
                class: classes.join(' '),
                'data-placeholder':
                    typeof config.placeholder === 'function'
                      ? config.placeholder({
                        node,
                        pos,
                        hasAnchor,
                      })
                      : config.placeholder,
              })
            );
          }
        };
        state.doc.descendants(decorate);
        return DecorationSet.create(state.doc, decorations);
      },
    },
  });
};


export type DefaultPluginsOptions = PlaceholderPluginOptions;
export type DefaultPluginsConfig = PlaceholderPluginOptions;

const defaultOptions: DefaultPluginsOptions = {
  ...defaultPlaceholderOptions
};

export default class DefaultPlugins implements Extension {
  config: DefaultPluginsConfig;

  constructor(options: DefaultPluginsOptions = {}) {
    this.config = { ...defaultOptions, ...options } as DefaultPluginsConfig;
  }

  get name() {
    return 'default-plugins';
  }

  get showMenu() {
    return false;
  }

  get plugins() {
    return [
      currentElementPlugin(),
      placeholderPlugin({
        placeholder: this.config.placeholder,
        emptyNodeClass: this.config.emptyNodeClass,
        emptyEditorClass: this.config.emptyEditorClass,
      }),
      // dropCursor(),
      gapCursor(),
      history(),
    ];
  }
}
