import { Plugin } from 'prosemirror-state';
import { Decoration, DecorationSet } from 'prosemirror-view';
import { findBlockNodes } from 'prosemirror-utils';
import * as low from 'lowlight';

function getDecorations({ doc, name }) {

  const decorations = [];
  const blocks = findBlockNodes(doc).filter(
    item => item.node.type.name === name
  );
  const flatten = list =>
    list.reduce((a, b) => a.concat(Array.isArray(b) ? flatten(b) : b), []);

  function parseNodes(nodes, className = []) {
    return nodes.map(node => {
      const classes = [
        ...className,
        ...(node.properties ? node.properties.className : [])
      ];

      if (node.children) {
        return parseNodes(node.children, classes);
      }

      return {
        text: node.value,
        classes
      }
    })
  }

  blocks.forEach(block => {
    let startPos = block.pos + 1;
    // @ts-ignore
    const items = block.node.content.content.map(item => {
      if (item.text) {
        return item.text;
      }
      return '\n'
    });
    const textContent = items.join('');
    const nodes = low.highlight(block.node.attrs.lang, textContent).value;
    flatten(parseNodes(nodes))
      .map(node => {
        const from = startPos;
        const to = from + node.text.length;

        startPos = to

        return {
          ...node,
          from,
          to
        }
      })
      .forEach(node => {
        const decoration = Decoration.inline(node.from, node.to, {
          class: node.classes.join(' ')
        });
        decorations.push(decoration);
      })
  })

  return DecorationSet.create(doc, decorations);
}

export default function HighlightPlugin({ name }) {
  return new Plugin({
    state: {
      init: (_, { doc }) => getDecorations({ doc, name }),
      apply: (transaction, decorationSet, oldState, state) => {
        // TODO: find way to cache decorations
        // see: https://discuss.prosemirror.net/t/how-to-update-multiple-inline-decorations-on-node-change/1493

        const nodeName = state.selection.$head.parent.type.name;
        const previousNodeName = oldState.selection.$head.parent.type.name;

        if (
          transaction.docChanged &&
          (nodeName === name || previousNodeName === name)
        ) {
          return getDecorations({ doc: transaction.doc, name });
        }

        return decorationSet.map(transaction.mapping, transaction.doc);
      }
    },
    props: {
      // @ts-ignore
      decorations(state) {
        return this.getState(state)
      }
    }
  })
}
