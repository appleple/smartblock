import * as React from 'react'
import styled from 'styled-components';
import { Editor } from '@aeaton/react-prosemirror';
import InlineMenuBar from './prose-inline-menu';
import PositionBtns from './prose-position-btns';
import Floater from './prose-floater';
import { options, menu } from './prose-config';
import './styles/base.css';
import { EditorView } from 'prosemirror-view';
import { Node } from 'prosemirror-model';
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
  padding: 40px 0 80px 0;
`;

interface ProseRender {
  editor: React.ReactChild;
  view: EditorView;
}

export default class App extends React.Component {
  container: HTMLElement;

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container ref={(ref) => this.container = ref}>
        <Input>
          <Editor
            options={options}
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
                      scrollTo(0, offsetTop + height + 80 + viewport.keyboardHeight);
                    }
                  } else {
                    scrollTo(0, offsetTop + height + 80);
                  }
                }
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