import * as React from 'react';
import * as showdown from 'showdown';
import { render, act } from '@testing-library/react';
import Extensions from '../src/extensions/';
import SmartBlock from '../src/components/smartblock';
import { EditorView } from 'prosemirror-view';
import { stripHTML } from './util';

jest.mock('uuid', () => {
  return {
    v4: jest.fn(() => `test-key-${Math.random().toString(36).substr(2, 9)}`)
  };
});

describe('smartblock', () => {
  it('should have title', () => {
    const { container } = render(<SmartBlock
      showTitle={true}
      extensions={Extensions}
      html="test"
    />);
    const title = container.querySelector<HTMLDivElement>('.smartblock-title');
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
    const { rerender } = render(<SmartBlock
      showTitle={true}
      extensions={Extensions}
      titleText="title"
      html="test"
      onTitleChange={f}
    />);
    act(() => {
      rerender(<SmartBlock
        showTitle={true}
        extensions={Extensions}
        titleText="title"
        html="test"
        onTitleChange={f}
      />);
    });
    const [call] = f.mock.calls;
    const [title] = call;
    expect(title).toBe('title');
  });

  it('should return exact html', () => {
    EditorView.prototype.coordsAtPos = () => ({
      top: 100,
      left: 0,
      right: 0,
      bottom: 0
    });
    const f = jest.fn();
    const { rerender } = render(<SmartBlock
      showTitle={true}
      extensions={Extensions}
      html="test"
      onChange={f}
    />);
    act(() => {
      rerender(<SmartBlock
        showTitle={true}
        extensions={Extensions}
        html="test"
        onChange={f}
      />);
    });
    const [call] = f.mock.calls;
    const { html, json } = call[0];
    // content is test
    expect(stripHTML(html)).toBe('test');
    // the tag is paragraph
    expect(json.content[0].type).toBe('paragraph');
  });

  it('should get data from localstorage', () => {
    //mock localstorage
    jest.spyOn(window.localStorage.__proto__, 'getItem').mockReturnValue('localstorage');
    const f = jest.fn();
    const { rerender } = render(<SmartBlock
      showTitle={true}
      extensions={Extensions}
      html="test"
      autoSave
      onChange={f}
    />);
    act(() => {
      rerender(<SmartBlock
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
    expect(stripHTML(html)).toBe('localstorage');
    // the tag is paragraph
    expect(json.content[0].type).toBe('paragraph');
  });

  it('should output markdown when having the exact properties', () => {
    const f = jest.fn();
    const { rerender } = render(<SmartBlock
      showTitle={true}
      extensions={Extensions}
      markdown="## test"
      outputMarkdown
      showdown={showdown}
      onChange={f}
    />);
    act(() => {
      rerender(<SmartBlock
        showTitle={true}
        extensions={Extensions}
        markdown="## test"
        outputMarkdown
        showdown={showdown}
        onChange={f}
      />);
    });
    const [call] = f.mock.calls;
    const { json, markdown } = call[0];
    expect(markdown).toBeTruthy();
    expect(json.content[0].type).toBe('heading2');
  });
});
