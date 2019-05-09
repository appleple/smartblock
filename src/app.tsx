import * as React from 'react'
import styled from 'styled-components';
import { Editor } from '@aeaton/react-prosemirror';
import InlineMenuBar from './prose-inline-menu';
import PositionBtns from './prose-position-btns';
import Floater from './prose-floater';
import { options, menu } from './prose-config';
import './styles/base.css';
import { EditorView } from 'prosemirror-view';
import { Node, DOMParser, DOMSerializer } from 'prosemirror-model';
import scrollTo from 'scroll-to';
import { getScrollTop, getOffset, getViewport } from './utili';

const Input = styled('div')`
  width: 100%;
  overflow-y: auto;
`

const Container = styled.div`
  max-width: 780px;
  margin: 0 auto;
  position: relative;
  padding: 10px 0 80px 0;
`;

interface ProseRender {
  editor: React.ReactChild;
  view: EditorView;
}

type OutputJson = {
  [key: string]: any
}

type AppProps = {
  onChange(json: OutputJson): void;
  json?: OutputJson;
  html?: string;
}

type AppState = {
  doc: Node
}

export default class App extends React.Component<AppProps, AppState> {
  container: HTMLElement;

  constructor(props) {
    super(props);
    const html = props.html;
    const json = props.json;
    let realHtml = html;
    if (json) {
      const node = Node.fromJSON(options.schema, json);
      realHtml = this.getHtmlFromNode(node);
    }
    const div = document.createElement('div');
    div.innerHTML = realHtml;
    const doc = DOMParser.fromSchema(options.schema).parse(div);
    this.state = { doc };
  }

  getHtmlFromNode(doc: Node) {
    const fragment = DOMSerializer.fromSchema(options.schema).serializeFragment(doc.content);
    const div = document.createElement('div');
    div.appendChild(fragment);
    return div.innerHTML;
  }

  render() {
    
    const { doc } = this.state;
    const editorOptions = {...options, doc };

    return (
      <Container id="container" ref={(ref) => this.container = ref}>
        <Input>
          <Editor
            place
            options={editorOptions}
            onChange={(doc: Node) => {
              const selected = this.container.querySelector('.selected') as HTMLDivElement;
              if (selected) {
                const viewport = getViewport();
                const top = getScrollTop() + viewport.height;
                const offsetTop = getOffset(selected).top;
                const height = selected.offsetHeight;
                if (offsetTop + height + 80 >= top) {
                  if (/iPod|iPhone|iPad/.test(navigator.platform) && document.activeElement) {
                    const activeElement = document.activeElement as HTMLElement;
                    if (activeElement.isContentEditable) {
                      scrollTo(0, offsetTop);
                    }
                  } else {
                    scrollTo(0, offsetTop + height + 80);
                  }
                }
              }
              if (this.props.onChange) {
                const json = doc.toJSON();
                const html = this.getHtmlFromNode(doc);
                this.props.onChange({
                  json, html
                });
              }
            }}
            render={({ editor, view } : ProseRender) => (
              <React.Fragment>
                <PositionBtns view={view} menu={{ blocks: menu.blocks }} />
                <Floater view={view}>
                  <InlineMenuBar menu={{ marks: menu.marks }} view={view} />
                </Floater>
                {editor}
              </React.Fragment>
            )}
          />
        </Input>
    </Container>);
  }
}