import * as React from 'react'
import * as ReactDOM from 'react-dom'
import styled from 'styled-components'
import { EditorView } from 'prosemirror-view'
import { Schema, Node, DOMParser, DOMSerializer } from 'prosemirror-model'
import { keymap } from 'prosemirror-keymap'

import { chainCommands } from 'prosemirror-commands'
import scrollTo from 'scroll-to'
import { EditorState, TextSelection } from 'prosemirror-state'
import uuid from 'uuid'

import Editor from './editor'
import InlineMenu from './inline-menu'
import EditMenu from './edit-menu'
import Menu from './menu'
import BackBtn from './back-btn';
import CustomLayout from './custom-layout'
import plugins from '../config/plugins'
import keys from '../config/keys'
import { getScrollTop, getOffset, getViewport } from '../utils'
import extensions from '../extensions'
import { Extension } from '../types'

const Input = styled('div')`
  width: 100%;
  overflow-y: auto;
`

const Container = styled.div`
  max-width: 780px;
  margin: 0 auto;
  position: relative;
  padding: 10px 0 80px 0;
`

interface ProseRender {
  editor: React.ReactChild
  view: EditorView
}

type OutputJson = {
  [key: string]: any
}

type AppProps = {
  onChange(json: OutputJson): void
  onInit?(json: { schema: Schema }): void
  json?: OutputJson
  html?: string
  extensions: Extension[]
  offsetTop?: number,
  showBackBtn?: boolean
}

type AppState = {
  doc: Node
  containerId: string,
  showMenus: boolean
}

const EDITMENUHEIGHT = 80;

export default class App extends React.Component<AppProps, AppState> {
  container: HTMLElement
  view?: EditorView;

  schema!: Schema

  static defaultProps = {
    extensions,
    offsetTop: 0,
    showBackBtn: false
  }

  constructor(props) {
    super(props)
    const { html, json, extensions } = props
    const schema = this.getSchemaFromExtensions(extensions)
    this.schema = schema
    let realHtml = html

    if (json) {
      const node = Node.fromJSON(this.schema, json)
      realHtml = this.getHtmlFromNode(node, schema)
    }
    const div = document.createElement('div')
    div.innerHTML = realHtml
    const doc = DOMParser.fromSchema(this.schema).parse(div)
    if (this.props.onInit) {
      this.props.onInit({
        schema
      })
    }
    this.state = { doc, containerId: uuid(), showMenus: true }
  }

  getBlockSchemas(extensions: Extension[]) {
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

  getBlocks(extensions: Extension[]) {
    const nodesSchema = extensions.filter(extension => {
      if (extension.group === 'block') {
        return true
      }
      return false
    })
    return nodesSchema
  }

  getMarkSchemas(extensions: Extension[]) {
    const marksSchema = this.getMarks(extensions)
    const marks = marksSchema.reduce((mark, curr, index) => {
      const newMark = { [curr.name]: { ...curr.schema } }
      return { ...mark, ...newMark }
    }, {})
    return marks
  }

  getMarks(extensions: Extension[]) {
    const marksSchema = extensions.filter(extension => {
      if (extension.group === 'mark') {
        return true
      }
      return false
    })
    return marksSchema
  }

  getEdits(extensions: Extension[]) {
    const editMarks = extensions.filter(extension => {
      if (extension.group === 'edit') {
        return true
      }
      return false
    })
    return editMarks
  }

  getSchemaBlockDependencies(extensions: Extension[]) {
    const schemas = extensions.reduce((schema, curr) => {
      if (curr.schemaDependencies) {
        return Object.assign({}, schema, curr.schemaDependencies)
      }
      return schema
    }, {})
    return schemas
  }

  getSchemaFromExtensions(extensions: Extension[]) {
    let nodes = this.getBlockSchemas(extensions)
    const nodeDependencies = this.getSchemaBlockDependencies(extensions)
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
    const marks = this.getMarkSchemas(extensions)
    return new Schema({ nodes, marks } as { nodes: any; marks: any })
  }

  getHtmlFromNode(doc: Node, schema: Schema) {
    const fragment = DOMSerializer.fromSchema(schema).serializeFragment(
      doc.content
    )
    const div = document.createElement('div')
    div.appendChild(fragment)
    return div.innerHTML
  }

  getKeys(extensions: Extension[]) {
    const extensionKeys = {}

    extensions.forEach(extension => {
      if (extension.keys) {
        const registeredKeys = extension.keys(this.schema)
        Object.keys(registeredKeys).forEach(key => {
          if (!extensionKeys[key]) {
            extensionKeys[key] = []
          }
          extensionKeys[key].push(registeredKeys[key])
        })
      }
    })

    Object.keys(keys).forEach(key => {
      if (!extensionKeys[key]) {
        extensionKeys[key] = []
      }
      extensionKeys[key].push(keys[key])
    })

    const keyMaps = {}

    Object.keys(extensionKeys).forEach(extensionKey => {
      keyMaps[extensionKey] = chainCommands(...extensionKeys[extensionKey])
    })

    return keymap(keyMaps)
  }

  getPlugins() {
    const { extensions } = this.props
    let customPlugins = []
    extensions.forEach(extension => {
      if (extension.plugins) {
        customPlugins = [...customPlugins, ...extension.plugins]
      }
    })
    const keyPlugin = this.getKeys(extensions)
    return [...plugins, ...customPlugins, keyPlugin]
  }

  getNodeViews() {
    const { extensions } = this.props
    const views = {}
    extensions.forEach(extension => {
      if (extension.render) {
        views[extension.name] = (node: Node, view: EditorView, getPos) => {
          const dom = document.createElement('div')
          requestAnimationFrame(() => {
            ReactDOM.render(<>{extension.render(node, view, getPos)}</>, dom)
          })

          return {
            dom,
            ignoreMutation() {
              return true
            },
            stopEvent() {
              return true
            }
          }
        }
      }
    })
    return views
  }

  getMenu(extensions: Extension[]) {
    return extensions.filter(extension => extension.showMenu)
  }

  onChange = (
    state: EditorState,
    dispatch: typeof EditorView.prototype.dispatch
  ) => {
    const { doc } = state
    if (this.container) {
      const selected = this.container.querySelector(
        '.selected'
      ) as HTMLDivElement
      if (selected) {
        const viewport = getViewport()
        const top = getScrollTop() + viewport.height
        const offsetTop = getOffset(selected).top
        const height = selected.offsetHeight
        if (offsetTop + EDITMENUHEIGHT >= top) {
          if (
            /iPod|iPhone|iPad/.test(navigator.platform) &&
            document.activeElement
          ) {
            const activeElement = document.activeElement as HTMLElement
            if (activeElement.isContentEditable) {
              scrollTo(0, offsetTop - EDITMENUHEIGHT)
            }
          } else {
            scrollTo(0, offsetTop - EDITMENUHEIGHT)
          }
        }
      }
    }
    if (this.props.onChange) {
      const { schema } = this
      const html = this.getHtmlFromNode(doc, this.schema)
      this.props.onChange({
        json: doc.content,
        html,
        schema
      })
    }
    const { childCount } = doc.content
    const lastNode = doc.content.child(childCount - 1)
    if (lastNode.type.name !== 'paragraph') {
      const { paragraph } = state.schema.nodes
      dispatch(
        state.tr.insert(state.doc.content.size, paragraph.createAndFill())
      )
    }
  }

  clearSelection = (e) => {
    const { containerId } = this.state;
    if (e.target.getAttribute('id') === containerId) {
      this.setState({
        showMenus: false
      });
    } else {
      this.setState({
        showMenus: true
      });
    }
  }

  render() {
    const { extensions, showBackBtn } = this.props
    const { doc, containerId, showMenus } = this.state
    const { schema } = this
    const editorOptions = { schema, plugins: this.getPlugins(), doc }
    const blocks = this.getBlocks(extensions)
    const marks = this.getMarks(extensions)
    const edits = this.getEdits(extensions)
    const nodeViews = this.getNodeViews()

    return (<div id={containerId} onClick={this.clearSelection}>
      <Container>
        <div
          className={showMenus ? '' : 'ProseMirrorHideSelection'}
          ref={ref => {
            if (ref && !this.container) {
              this.container = ref
              this.forceUpdate()
            }
          }}
        >
          <Input>
            <Editor
              options={editorOptions}
              nodeViews={nodeViews}
              onChange={this.onChange}
              render={({ editor, view }: ProseRender) => (
                <>
                  {showMenus && <>
                    <Menu view={view} menu={this.getMenu(blocks)} />
                    <EditMenu view={view} menu={this.getMenu(edits)} />
                    <InlineMenu menu={this.getMenu(marks)} view={view} />
                    <CustomLayout view={view} menu={this.getMenu(blocks)} />
                    {showBackBtn && <BackBtn view={view} />}
                  </>}
                  {editor}
                </>)
              }
            />
          </Input>
        </div>
      </Container>
    </div>)
  }
}
