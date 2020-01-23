import * as React from 'react';
import {
  addColumnAfter,
  addColumnBefore,
  deleteColumn,
  addRowAfter,
  addRowBefore,
  deleteRow,
  mergeCells,
  splitCell,
  goToNextCell,
  tableEditing,
  tableNodes
} from 'prosemirror-tables'
import { setBlockType } from 'prosemirror-commands'
import * as uuid from 'uuid/v4'
import { toggleCell } from './util';
import TableIcon from '../../components/icons/Table'
import LeftInsertIcon from '../../components/icons/left-insert'
import RightInsertIcon from '../../components/icons/right-insert'
import TopInsertIcon from '../../components/icons/top-insert'
import BottomInsertIcon from '../../components/icons/bottom-insert'
import SplitIcon from '../../components/icons/split'
import MergeIcon from '../../components/icons/merge'
import RemoveRowIcon from '../../components/icons/remove-row';
import RemoveColIcon from '../../components/icons/remove-col';

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


export default class Table extends Extension {
  constructor(props?: ExtensionProps) {
    super(props);
  }

  get name() {
    return 'table';
  }

  get group() {
    return 'block';
  }

  get showMenu() {
    return true;
  }

  get schema() {
    if (this.customSchema) {
      return this.customSchema;
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
          class: this.className
        },
        ['tbody', 0]
      ];
    }
    schemas.table.attrs = {
      id: { default: '' }
    }
    return schemas.table;
  }

  get schemaDependencies() {
    const { table, ...noTable } = schemas;
    return noTable;
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
    return blockActive(state.schema.nodes.table)(state);
  }

  enable(state) {
    return setBlockType(state.schema.nodes.table)(state);
  }

  onClick(state, dispatch) {
    const table = createTable(state.schema, {
      id: uuid()
    });
    const tr = state.tr.replaceSelectionWith(table);
    dispatch(tr);
  }

  customInlineMenu({ state, dispatch }) {
    return (<>
      <Button
        type="button"
        className="smartblock-cell-btn"
        onClick={() => {
          mergeCells(state, dispatch);
        }}
      >
        <MergeIcon style={{ width: '24px', height: '24px' }} />
      </Button>
      <Button
        type="button"
        className="smartblock-cell-btn"
        onClick={() => {
          splitCell(state, dispatch);
        }}
      >
        <SplitIcon style={{ width: '24px', height: '24px' }} />
      </Button>
      <Button
        type="button"
        className="smartblock-cell-btn"
        onClick={() => {
          toggleCell('th')(state, dispatch);
        }}
      >
        <span style={{ display: 'inline-block', verticalAlign: 'text-bottom' }}>th</span>
      </Button>
      <Button
        type="button"
        className="smartblock-cell-btn"
        onClick={() => {
          toggleCell('td')(state, dispatch);
        }}
      >
        <span style={{ display: 'inline-block', verticalAlign: 'text-bottom' }}>td</span>
      </Button>
    </>)
  }

  customMenu({ state, dispatch }) {
    return (
      <>
        <Button
          type="button"
          onClick={() => {
            addColumnAfter(state, dispatch);
          }}
        >
          <RightInsertIcon style={{ width: '24px', height: '24px' }} />
        </Button>
        <Button
          type="button"
          onClick={() => {
            addColumnBefore(state, dispatch);
          }}
        >
          <LeftInsertIcon style={{ width: '24px', height: '24px' }} />
        </Button>
        <Button
          type="button"
          onClick={() => {
            addRowBefore(state, dispatch);
          }}
        >
          <TopInsertIcon style={{ width: '24px', height: '24px' }} />
        </Button>
        <Button
          type="button"
          onClick={() => {
            addRowAfter(state, dispatch);
          }}
        >
          <BottomInsertIcon style={{ width: '24px', height: '24px' }} />
        </Button>

        <Button
          type="button"
          onClick={() => {
            deleteColumn(state, dispatch);
          }}
        >
          <RemoveColIcon style={{ width: '24px', height: '24px' }} />
        </Button>
        <Button
          type="button"
          onClick={() => {
            deleteRow(state, dispatch);
          }}
        >
          <RemoveRowIcon style={{ width: '24px', height: '24px' }} />
        </Button>
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
