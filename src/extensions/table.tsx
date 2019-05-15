import * as React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faTable } from '@fortawesome/fontawesome-free-solid'
import {addColumnAfter, addColumnBefore, deleteColumn, addRowAfter, addRowBefore, deleteRow,
  mergeCells, splitCell, setCellAttr, toggleHeaderRow, toggleHeaderColumn, toggleHeaderCell,
  goToNextCell, deleteTable, fixTable, tableEditing, columnResizing, tableNodes}  from "prosemirror-tables";
import { setBlockType } from 'prosemirror-commands';
import { Extension } from '../types';
import { blockActive } from '../util';

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

export default class Table implements Extension {
  get name() {
    return 'table';
  }
  get showMenu() {
    return true;
  }
  get schema() {
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
      columnResizing(),
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
    // console.log(state.tr);
    state.tr.replaceSelectionWithNode(state.schema.nodes.table);
    // setBlockType(state.schema.nodes.table)(state, dispatch);
  }
  keys() {
    return {
      'Tab': goToNextCell(1),
      'Shift-Tab': goToNextCell(-1)
    }
  }
}