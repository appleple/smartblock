import * as React from 'react'
import styled from 'styled-components'
import {
  addColumnAfter,
  addColumnBefore,
  deleteColumn,
  addRowAfter,
  addRowBefore,
  deleteRow,
  mergeCells,
  splitCell,
  toggleHeaderCell,
  goToNextCell,
  tableEditing,
  columnResizing,
  tableNodes
} from 'prosemirror-tables'
import { setBlockType } from 'prosemirror-commands'
import uuid from 'uuid'
import { toggleCell } from './util';
import TableIcon from '../../components/icons/Table'
import LeftInsertIcon from '../../components/icons/LeftInsert'
import RightInsertIcon from '../../components/icons/RightInsert'
import TopInsertIcon from '../../components/icons/TopInsert'
import BottomInsertIcon from '../../components/icons/BottomInsert'
import SplitIcon from '../../components/icons/Split'
import MergeIcon from '../../components/icons/Merge'
import RemoveRowIcon from '../../components/icons/RemoveRow';
import RemoveColIcon from '../../components/icons/RemoveCol';

import { createTable, blockActive } from '../../utils'
import { Extension, ExtensionProps } from '../../types'
import Button from '../../components/button'

const schemas = tableNodes({
  group: 'block',
  tableGroup: 'block',
  cellContent: 'block+',
  cellAttributes: {
    background: {
      default: null,
      getFromDOM(dom) {
        return dom.style.backgroundColor || null
      },
      setDOMAttr(value, attrs) {
        if (value)
          attrs.style = `${attrs.style || ''}background-color: ${value};`
      }
    }
  }
})

const CellButton = styled(Button)`
  .icon {
    font-size: 30px;
  }
`

export default class Table extends Extension {
  constructor(props?: ExtensionProps) {
    super(props)
  }

  get name() {
    return 'table'
  }

  get group() {
    return 'block'
  }

  get showMenu() {
    return true
  }

  get schema() {
    if (this.customSchema) {
      return this.customSchema
    }
    schemas.table.parseDOM = [
      {
        tag: 'table',
        getAttrs(dom) {
          return {
            id: dom.getAttribute('id') || uuid()
          }
        }
      }
    ]
    schemas.table.toDOM = node => {
      return [
        'table',
        {
          id: node.attrs.id || uuid(),
          class: this.className
        },
        ['tbody', 0]
      ]
    }
    schemas.table.attrs = {
      id: { default: '' }
    }
    return schemas.table
  }

  get schemaDependencies() {
    const { table, ...noTable } = schemas
    return noTable
  }

  get icon() {
    return <TableIcon style={{ width: '24px', height: '24px' }} />
  }

  get hideBlockMenuOnFocus() {
    return true;
  }

  get plugins() {
    return [
      // columnResizing(),
      tableEditing()
    ]
  }

  active(state) {
    return blockActive(state.schema.nodes.table)(state)
  }

  enable(state) {
    return setBlockType(state.schema.nodes.table)(state)
  }

  onClick(state, dispatch) {
    const table = createTable(state.schema, {
      id: uuid()
    })
    const tr = state.tr.replaceSelectionWith(table)
    dispatch(tr)
  }

  customInlineMenu({ state, dispatch }) {
    return (<>
      <CellButton
        type="button"
        onClick={() => {
          mergeCells(state, dispatch)
        }}
      >
        <MergeIcon style={{ width: '24px', height: '24px' }} />
      </CellButton>
      <CellButton
        type="button"
        onClick={() => {
          splitCell(state, dispatch)
        }}
      >
        <SplitIcon style={{ width: '24px', height: '24px' }} />
      </CellButton>
      <CellButton
          type="button"
          onClick={() => {
            toggleCell('th')(state, dispatch)
          }}
        >
          <span style={{ display: 'inline-block', verticalAlign: 'text-bottom'}}>th</span>
      </CellButton>
      <CellButton
          type="button"
          onClick={() => {
            toggleCell('td')(state, dispatch)
          }}
        >
          <span style={{ display: 'inline-block', verticalAlign: 'text-bottom'}}>td</span>
      </CellButton>
    </>)
  }

  customMenu({ state, dispatch }) {
    return (
      <>
        <CellButton
          type="button"
          onClick={() => {
            addColumnAfter(state, dispatch)
          }}
        >
          <RightInsertIcon style={{ width: '24px', height: '24px' }} />
        </CellButton>
        <CellButton
          type="button"
          onClick={() => {
            addColumnBefore(state, dispatch)
          }}
        >
          <LeftInsertIcon style={{ width: '24px', height: '24px' }} />
        </CellButton>
        <CellButton
          type="button"
          onClick={() => {
            addRowBefore(state, dispatch)
          }}
        >
          <TopInsertIcon style={{ width: '24px', height: '24px' }} />
        </CellButton>
        <CellButton
          type="button"
          onClick={() => {
            addRowAfter(state, dispatch)
          }}
        >
          <BottomInsertIcon style={{ width: '24px', height: '24px' }} />
        </CellButton>

        <CellButton
          type="button"
          onClick={() => {
            deleteColumn(state, dispatch)
          }}
        >
          <RemoveColIcon style={{ width: '24px', height: '24px' }} />
        </CellButton>
        <CellButton
          type="button"
          onClick={() => {
            deleteRow(state, dispatch)
          }}
        >
          <RemoveRowIcon style={{ width: '24px', height: '24px' }} />
        </CellButton>
      </>
    )
  }

  keys() {
    return {
      Tab: goToNextCell(1),
      'Shift-Tab': goToNextCell(-1)
    }
  }
}
