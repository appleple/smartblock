import { Extension } from "../src";
import { Schema, Node } from "prosemirror-model";
import { EditorView } from "prosemirror-view";
import { EditorState } from 'prosemirror-state';
import { DOMParser } from 'prosemirror-model';

const getBlockSchemas = (extensions: Extension[]) => {
  const nodesSchema = extensions.filter(extension => {
    if (extension.schema && extension.schema.group === 'block') {
      return true
    }
    return false
  })
  const nodes = nodesSchema.reduce((node, curr, index) => {
    const newNode = { [curr.name]: { ...curr.schema } }
    return { ...node, ...newNode }
  }, {})
  return nodes
}

const getSchemaBlockDependencies = (extensions: Extension[]) => {
  const schemas = extensions.reduce((schema, curr) => {
    if (curr.schemaDependencies) {
      return Object.assign({}, schema, curr.schemaDependencies)
    }
    return schema
  }, {})
  return schemas
}

const getMarks = (extensions: Extension[]) => {
  const marksSchema = extensions.filter(extension => {
    if (extension.group === 'mark') {
      return true
    }
    return false
  })
  return marksSchema
}

const getMarkSchemas = (extensions: Extension[]) => {
  const marksSchema = getMarks(extensions)
  const marks = marksSchema.reduce((mark, curr, index) => {
    const newMark = { [curr.name]: { ...curr.schema } }
    return { ...mark, ...newMark }
  }, {})
  return marks
}

export const getSchemaFromExtensions = (extensions: Extension[]) => {
  let nodes = getBlockSchemas(extensions)
  const nodeDependencies = getSchemaBlockDependencies(extensions)
  const base = {
    doc: {
      content: 'block+'
    },
    text: {
      group: 'inline'
    },
    hard_break: {
      inline: true,
      group: 'inline',
      selectable: false,
      parseDOM: [{ tag: 'br' }],
      toDOM() {
        return ['br']
      }
    }
  }
  nodes = { ...nodes, ...base, ...nodeDependencies }
  const marks = getMarkSchemas(extensions)
  return new Schema({ nodes, marks })
}

export const getNodeViews = (extensions: Extension[]) => {
  const views = {}
  extensions.forEach(extension => {
    if (extension.view !== undefined) {
      views[extension.name] = (node: Node, view: EditorView, getPos) => {
        return extension.view && extension.view(node, view, getPos);
      }
    }
  })
  return views
}

export const getEditorViewFromExtensions = (extensions: Extension[]) => {
  const schema = getSchemaFromExtensions(extensions);
  const div = document.createElement('div')
  div.innerHTML = 'test';
  const doc = DOMParser.fromSchema(schema).parse(div, {
    preserveWhitespace: true
  });
  const options = { schema, plugins: [], doc };
  return new EditorView(null, {
    state: EditorState.create(options),
    attributes: {},
    nodeViews: {}
  });
}

export const stripHTML = (html: string) => html.replace(/<[^>]*>?/gm, '')
