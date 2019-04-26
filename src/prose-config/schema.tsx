import { Schema, MarkType } from 'prosemirror-model'

import nodes from './nodes'
import marks from './marks'

export default new Schema({ nodes, marks } as { nodes: any, marks: any })
