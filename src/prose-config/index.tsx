// An example setup, adapted from prosemirror-example-setup

import schema from './schema'
import plugins from './plugins'

export const options = {
  plugins,
  schema
}

export { default as menu } from './menu'
