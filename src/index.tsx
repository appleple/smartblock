
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import styled from 'styled-components';
import { Editor } from '@aeaton/react-prosemirror';
import InlineMenuBar from './prose-inline-menu';
import PositionBtns from './prose-position-btns';
import Floater from './prose-floater';
import { options, menu } from './prose-config';
import './styles/base.css';
import { EditorView } from 'prosemirror-view';

const Input = styled('div')`
  width: 100%;
  overflow-y: auto;
`

const Container = styled.div`
  max-width: 780px;
  margin: 0 auto;
  position: relative;
`;

interface ProseRender {
  editor: React.ReactChild;
  view: EditorView;
}

ReactDOM.render(
  <Container>
    <Input>
      <Editor
        options={options}
        onChange={(doc: any) => {
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
  </Container>,
  document.getElementById('app')
)