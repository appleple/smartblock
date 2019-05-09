import { marks } from 'prosemirror-schema-basic'

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
  strikethrough,
  underline
}
