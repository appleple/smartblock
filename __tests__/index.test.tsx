import * as React from 'react';
import * as TestRenderer from 'react-test-renderer'
import EditMenu from '../src/components/edit-menu';
import { EditorView } from 'prosemirror-view';
import { EditorState } from 'prosemirror-state';
import { getSchemaFromExtensions } from './util';
import { DOMParser } from 'prosemirror-model';

let view: EditorView;

describe('components', () => {
  beforeAll(() => {
    const schema = getSchemaFromExtensions([]);
    const div = document.createElement('div')
    div.innerHTML = 'test';
    const doc = DOMParser.fromSchema(schema).parse(div, {
      preserveWhitespace: true
    });
    const options = { schema, plugins: [], doc };
    view = new EditorView(null, {
      state: EditorState.create(options),
      attributes: null,
      nodeViews: {}
    })
  })
  it('it', () => {
    const editMenu = TestRenderer.create(<EditMenu view={view} menu={[]} />);
  })
})
