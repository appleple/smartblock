import { Schema, Slice } from 'prosemirror-model';
import { EditorState } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';

describe('clipboard paste', () => {
  it('rejects invalid attributes supplied through the clipboard slice context', () => {
    const schema = new Schema({
      nodes: {
        doc: { content: 'block+' },
        paragraph: {
          group: 'block',
          content: 'text*',
          parseDOM: [{ tag: 'p' }],
          toDOM: () => ['p', 0],
        },
        container: {
          group: 'block',
          content: 'paragraph+',
          attrs: {
            kind: { default: 'safe', validate: 'string' },
          },
          toDOM: (node) => ['div', { 'data-kind': node.attrs.kind }, 0],
        },
        text: { group: 'inline' },
      },
    });

    const state = EditorState.create({
      schema,
      doc: schema.node('doc', null, [schema.node('paragraph', null, schema.text('start'))]),
    });
    let pasted: Slice | undefined;
    const view = new EditorView(document.createElement('div'), {
      state,
      handlePaste: (_view, _event, slice) => {
        pasted = slice;
        return true;
      },
    });

    const content = document.createElement('p');
    content.setAttribute('data-pm-slice', '0 0 ' + JSON.stringify(['container', { kind: 42 }]));
    content.textContent = 'pasted';
    const event = new Event('paste', { bubbles: true, cancelable: true });
    Object.defineProperty(event, 'clipboardData', {
      value: {
        getData: (type: string) => type === 'text/html' ? content.outerHTML : '',
      },
    });

    view.dispatchEvent(event);
    expect(pasted?.content.firstChild?.type.name).toBe('paragraph');
    view.destroy();
  });
});
