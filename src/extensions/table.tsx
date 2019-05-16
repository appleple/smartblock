import * as React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faTable } from '@fortawesome/fontawesome-free-solid'
import {addColumnAfter, addColumnBefore, deleteColumn, addRowAfter, addRowBefore, deleteRow,
  mergeCells, splitCell, setCellAttr, toggleHeaderRow, toggleHeaderColumn, toggleHeaderCell,
  goToNextCell, fixTable, tableEditing, columnResizing, tableNodes}  from "prosemirror-tables";
import { createTable } from 'prosemirror-utils';
import { setBlockType } from 'prosemirror-commands';
import { NodeSelection } from 'prosemirror-state';

import { Extension } from '../types';
import { blockActive } from '../util';
import Button from '../components/Button';

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
    const table = createTable(state.schema);
    const { tr } = state;
    dispatch(state.tr.replaceSelectionWith(table));
    const resolvedPos = tr.doc.resolve(
      tr.selection.anchor - tr.selection.$anchor.nodeBefore.nodeSize - 1
    );
    tr.setSelection(new NodeSelection(resolvedPos));
  }
  customMenu({ state, dispatch }) {
    return (<>
      <Button onClick={() => {
        deleteColumn(state, dispatch);
      }}>列を削除</Button>
      <Button onClick={() => {
        deleteRow(state, dispatch);
      }}>行を削除</Button>
      <Button onClick={() => {
        addColumnBefore(state, dispatch);
      }}>左に列を追加</Button>
      <Button onClick={() => {
        addColumnAfter(state, dispatch);
      }}>右に列を追加</Button>
      <Button onClick={() => {
        addRowBefore(state, dispatch);
      }}>上に行を追加</Button>
      <Button onClick={() => {
        addRowAfter(state, dispatch);
      }}>下に行を追加</Button>
      <Button onClick={() => {
        mergeCells(state, dispatch);
      }}>セルの結合</Button>
      <Button onClick={() => {
        splitCell(state, dispatch);
      }}>セルの分割</Button>
    </>)
  }
  keys() {
    return {
      'Tab': goToNextCell(1),
      'Shift-Tab': goToNextCell(-1)
    }
  }
}