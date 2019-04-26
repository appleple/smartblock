import { marks } from 'prosemirror-schema-basic'

const subscript = {
  excludes: 'superscript',
  parseDOM: [
    { tag: 'sub' },
    { style: 'vertical-align=sub' }
  ],
  toDOM: () => ['sub']
}

const superscript = {
  excludes: 'subscript',
  parseDOM: [
    { tag: 'sup' },
    { style: 'vertical-align=super' }
  ],
  toDOM: () => ['sup']
}

const strikethrough = {
  parseDOM: [
    { tag: 'strike' },
    { style: 'text-decoration=line-through' },
    { style: 'text-decoration-line=line-through' }
  ],
  toDOM: () => ['span', {
    style: 'text-decoration-line:line-through'
  }]
}

const underline = {
  parseDOM: [
    { tag: 'u' },
    { style: 'text-decoration=underline' }
  ],
  toDOM: () => ['span', {
    style: 'text-decoration:underline'
  }]
}

export default {
  ...marks,
  subscript,
  superscript,
  strikethrough,
  underline
}
