import * as React from 'react';
import styled from 'styled-components';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faTable } from '@fortawesome/fontawesome-free-solid'
import {addColumnAfter, addColumnBefore, deleteColumn, addRowAfter, addRowBefore, deleteRow,
  mergeCells, splitCell, setCellAttr, toggleHeaderRow, toggleHeaderColumn, toggleHeaderCell,
  goToNextCell, fixTable, tableEditing, columnResizing, tableNodes  }  from "prosemirror-tables";
import { selectTable, findTable } from 'prosemirror-utils';
import { createTable } from '../utils';
import { setBlockType } from 'prosemirror-commands';
import uuid from 'uuid';

import { Extension } from '../types';
import { blockActive } from '../utils';
import Button from '../components/button';

const schemas = tableNodes({
  group: 'block',
  tableGroup: "block",
  cellContent: "block+",
  cellAttributes: {
    background: {
      default: null,
      getFromDOM(dom) { return dom.style.backgroundColor || null },
      setDOMAttr(value, attrs) { if (value) attrs.style = (attrs.style || "") + `background-color: ${value};` }
    }
  }
});

const CellButton = styled(Button)`
  .icon {
    font-size: 30px;
  }
`

export default class Table implements Extension {
  get name() {
    return 'table';
  }
  get showMenu() {
    return true;
  }
  get schema() {
    schemas.table.parseDOM = [{
      tag: 'table',
      getAttrs(dom) {
        return {
          id: dom.getAttribute('id') || uuid()
        }
      }
    }];
    schemas.table.toDOM = (node) => {
      return ["table", {
        id: node.attrs.id || uuid()
      }, ["tbody", 0]];
    }
    schemas.table.attrs = {
      id: { default: '' }
    };
    return schemas.table
  }
  get schemaDependencies() {
    const { table, ...noTable } = schemas;
    return noTable;
  }
  get icon() {
    return (<FontAwesomeIcon icon={faTable} />)
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
    return setBlockType(state.schema.nodes.table)(state);
  }
  onClick (state, dispatch) {
    const table = createTable(state.schema, {
      id: uuid()
    });
    const tr = state.tr.replaceSelectionWith(table);
    dispatch(tr);
  }
  customMenu({ state, dispatch }) {
    return (<>
      <CellButton onClick={() => {
        addColumnBefore(state, dispatch);
      }}><i className="icon icon-left-insert"></i></CellButton>
      <CellButton onClick={() => {
        addColumnAfter(state, dispatch);
      }}><i className="icon icon-right-insert"></i></CellButton>
      <CellButton onClick={() => {
        addRowBefore(state, dispatch);
      }}><i className="icon icon-top-insert"></i></CellButton>
      <CellButton onClick={() => {
        addRowAfter(state, dispatch);
      }}><i className="icon icon-bottom-insert"></i></CellButton>
      <CellButton onClick={() => {
        deleteColumn(state, dispatch);
      }}><i className="icon icon-right-remove"></i></CellButton>
      <CellButton onClick={() => {
        deleteRow(state, dispatch);
      }}><i className="icon icon-top-remove"></i></CellButton>
      <CellButton onClick={() => {
        mergeCells(state, dispatch);
      }}><i className="icon icon-merge01"></i></CellButton>
      <CellButton onClick={() => {
        splitCell(state, dispatch);
      }}><i className="icon icon-split01"></i></CellButton>
    </>)
  }
  keys() {
    return {
      'Tab': goToNextCell(1),
      'Shift-Tab': goToNextCell(-1)
    }
  }
}