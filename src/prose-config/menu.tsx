import { lift, toggleMark, wrapIn, setBlockType } from 'prosemirror-commands';
import { redo, undo } from 'prosemirror-history';
import { wrapInList } from 'prosemirror-schema-list'
import { findChildren } from 'prosemirror-utils';
import schema from './schema'
import icons from './icons'


const markActive = type => state => {
  const { from, $from, to, empty } = state.selection

  return empty
    ? type.isInSet(state.storedMarks || $from.marks())
    : state.doc.rangeHasMark(from, to, type)
}

const blockActive = (type, attrs = {}) => state => {
  const { selection } = state;
  const { $from, to } = state.selection
  const { $anchor } = selection;
  const resolvedPos = state.doc.resolve($anchor.pos) as any;
  const rowNumber = resolvedPos.path[1];
  let i = 0;
  const [ firstNode ] = findChildren(state.doc, (_node) => {
    if (rowNumber === i) {
      return true;
    }
    i++;
    return false;
  }, false);

  return to <= $from.end() && firstNode.node.hasMarkup(type, attrs)
}

const canInsert = type => state => {
  const { $from } = state.selection

  for (let d = $from.depth; d >= 0; d--) {
    const index = $from.index(d)

    if ($from.node(d).canReplaceWith(index, index, type)) {
      return true
    }
  }

  return false
}

const promptForURL = () => {
  let url = window && window.prompt('Enter the URL', 'https://')

  if (url && !/^https?:\/\//i.test(url)) {
    url = 'http://' + url
  }

  return url
}

export default {
  marks: {
    em: {
      title: 'Toggle emphasis',
      content: icons.em,
      active: markActive(schema.marks.em),
      run: toggleMark(schema.marks.em)
    },
    strong: {
      title: 'Toggle strong',
      content: icons.strong,
      active: markActive(schema.marks.strong),
      run: toggleMark(schema.marks.strong)
    },
    code: {
      title: 'Toggle code',
      content: icons.code,
      active: markActive(schema.marks.code),
      run: toggleMark(schema.marks.code)
    },
    underline: {
      title: 'Toggle underline',
      content: icons.underline,
      active: markActive(schema.marks.underline),
      run: toggleMark(schema.marks.underline)
    },
    strikethrough: {
      title: 'Toggle strikethrough',
      content: icons.strikethrough,
      active: markActive(schema.marks.strikethrough),
      run: toggleMark(schema.marks.strikethrough)
    },
    link: {
      title: 'Add or remove link',
      content: icons.link,
      active: markActive(schema.marks.link),
      enable: state => !state.selection.empty,
      run (state, dispatch) {
        if (markActive(schema.marks.link)(state)) {
          toggleMark(schema.marks.link)(state, dispatch)
          return true
        }

        const href = promptForURL()
        if (!href) return false

        toggleMark(schema.marks.link, { href })(state, dispatch)
        // view.focus()
      }
    }
  },
  blocks: {
    plain: {
      title: 'Change to paragraph',
      content: icons.paragraph,
      active: blockActive(schema.nodes.paragraph),
      enable: setBlockType(schema.nodes.paragraph),
      run: setBlockType(schema.nodes.paragraph)
    },

    h1: {
      title: 'Change to heading level 1',
      content: icons.heading,
      active: blockActive(schema.nodes.heading, { level: 1 }),
      enable: setBlockType(schema.nodes.heading, { level: 1 }),
      run: setBlockType(schema.nodes.heading, { level: 1 })
    },
    h2: {
      title: 'Change to heading level 2',
      content: 'H2',
      active: blockActive(schema.nodes.heading, { level: 2 }),
      enable: setBlockType(schema.nodes.heading, { level: 2 }),
      run: setBlockType(schema.nodes.heading, { level: 2 })
    },
    bullet_list: {
      title: 'Wrap in bullet list',
      content: icons.bullet_list,
      active: blockActive(schema.nodes.bullet_list),
      enable: wrapInList(schema.nodes.bullet_list),
      run: wrapInList(schema.nodes.bullet_list)
    },
    ordered_list: {
      title: 'Wrap in ordered list',
      content: icons.ordered_list,
      active: blockActive(schema.nodes.ordered_list),
      enable: wrapInList(schema.nodes.ordered_list),
      run: wrapInList(schema.nodes.ordered_list)
    },
    blockquote: {
      title: 'Wrap in block quote',
      content: icons.blockquote,
      active: blockActive(schema.nodes.blockquote),
      enable: wrapIn(schema.nodes.blockquote),
      run: wrapIn(schema.nodes.blockquote)
    },
    code_block: {
      title: 'Change to code block',
      content: icons.code_block,
      active: blockActive(schema.nodes.code_block),
      enable: setBlockType(schema.nodes.code_block),
      run: setBlockType(schema.nodes.code_block)
    },
    lift: {
      title: 'Lift out of enclosing block',
      content: icons.lift,
      enable: lift,
      run: lift
    }
  },
  insert: {
    image: {
      title: 'Insert image',
      content: icons.image,
      enable: canInsert(schema.nodes.image),
      run: (state, dispatch) => {
        const src = promptForURL()
        if (!src) return false

        const img = schema.nodes.image.createAndFill({ src })
        dispatch(state.tr.replaceSelectionWith(img))
      }
    },
    footnote: {
      title: 'Insert footnote',
      content: icons.footnote,
      enable: canInsert(schema.nodes.footnote),
      run: (state, dispatch) => {
        const footnote = schema.nodes.footnote.create()
        dispatch(state.tr.replaceSelectionWith(footnote))
      }
    },
    table: {
      title: 'Insert table',
      content: icons.table,
      enable: canInsert(schema.nodes.table),
      run: (state, dispatch) => {

      }
    }
  },
  history: {
    undo: {
      title: 'Undo last change',
      content: icons.undo,
      enable: undo,
      run: undo
    },
    redo: {
      title: 'Redo last undone change',
      content: icons.redo,
      enable: redo,
      run: redo
    }
  }
}
