import * as React from 'react';
import * as TestRenderer from 'react-test-renderer'
import Extensions from '../src/extensions/';
import SmartBlock from '../src/components/smartblock';
import { EditorView } from 'prosemirror-view';
import { stripHTML } from './util';

describe('smartblock', () => {
  it('should have title', () => {
    const smartblock = TestRenderer.create(<SmartBlock
      showTitle={true}
      extensions={Extensions}
      html="test"
    />);
    const title = smartblock.root.findAllByProps({
      className: 'smartblock-title'
    });
    expect(title).toBeTruthy();
  });

  it('should return exact title', () => {
    EditorView.prototype.coordsAtPos = () => ({
      top: 100,
      left: 0,
      right: 0,
      bottom: 0
    });
    const f = jest.fn();
    const smartblock = TestRenderer.create(<SmartBlock
      showTitle={true}
      extensions={Extensions}
      titleText="title"
      html="test"
      onTitleChange={f}
    />);
    TestRenderer.act(() => {
      smartblock.update(<SmartBlock
        showTitle={true}
        extensions={Extensions}
        titleText="title"
        html="test"
        onTitleChange={f}
      />);
    });
    const [call] = f.mock.calls;
    const [title] = call;
    expect(title).toEqual('title');
  });

  it('should return exact html', () => {
    EditorView.prototype.coordsAtPos = () => ({
      top: 100,
      left: 0,
      right: 0,
      bottom: 0
    });
    const f = jest.fn();
    const smartblock = TestRenderer.create(<SmartBlock
      showTitle={true}
      extensions={Extensions}
      html="test"
      onChange={f}
    />);
    TestRenderer.act(() => {
      smartblock.update(<SmartBlock
        showTitle={true}
        extensions={Extensions}
        html="test"
        onChange={f}
      />);
    });
    const [call] = f.mock.calls;
    const { html, json } = call[0];
    // content is test
    expect(stripHTML(html)).toEqual('test');
    // the tag is paragraph
    expect(json.content[0].type).toEqual('paragraph');
  });

  it('should get data from localstorage', () => {
    //mock localstorage
    jest.spyOn(window.localStorage.__proto__, 'getItem').mockReturnValue('localstorage');
    const f = jest.fn();
    const smartblock = TestRenderer.create(<SmartBlock
      showTitle={true}
      extensions={Extensions}
      html="test"
      autoSave
      onChange={f}
    />);
    TestRenderer.act(() => {
      smartblock.update(<SmartBlock
        showTitle={true}
        extensions={Extensions}
        html="test"
        autoSave
        onChange={f}
      />);
    });
    const [call] = f.mock.calls;
    const { html, json } = call[0];
    // content is test
    expect(stripHTML(html)).toEqual('localstorage');
    // the tag is paragraph
    expect(json.content[0].type).toEqual('paragraph');
  })
});