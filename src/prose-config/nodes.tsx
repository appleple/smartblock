import { nodes } from 'prosemirror-schema-basic'
import { orderedList, bulletList, listItem } from 'prosemirror-schema-list'
import { tableNodes } from 'prosemirror-tables'
import { footnoteNodes } from '@aeaton/prosemirror-footnotes'

const listNodes = {
  ordered_list: {
    ...orderedList,
    content: 'list_item+',
    group: 'block'
  },
  bullet_list: {
    ...bulletList,
    content: 'list_item+',
    group: 'block'
  },
  list_item: {
    ...listItem,
    content: 'paragraph block*'
  }
}

export default {
  ...nodes,
  ...listNodes,
  ...tableNodes({
    tableGroup: 'block',
    cellContent: 'block+'
  }),
  ...footnoteNodes
}
