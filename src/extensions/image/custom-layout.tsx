import * as React from 'react';
import styled from 'styled-components';
import uuid from 'uuid';
import { findChildren } from 'prosemirror-utils'
import { setBlockType } from 'prosemirror-commands';
import Button from '../../components/button';
import { findSelectedNodeWithType } from '../../utils';
import CenterIcon from './center-icon';
import FullIcon from './full-icon';
import EditIcon from './edit-icon';
import MediaDropArea from './droparea';

const MediaMenu = styled.div`
  position: absolute;
`;

const MediaMenuTool = styled.div`
  width: 100%;
  background-color: transparent;
  padding: 20px 20px 0 20px;
  white-space: nowrap;
  border-bottom-right-radius: 3px;
  border-bottom-left-radius: 3px;
`;

const BtnGroup = styled.div`
  display: inline-table;
  margin-right: 5px;
  vertical-align: middle;
`

export default ({ state, dispatch, dom }) => {
  const { offsetHeight, offsetWidth } = dom;
  const [height, setHeight] = React.useState(offsetHeight);

  React.useEffect(() => {
    const interval = setInterval(() => {
      if (dom.offsetHeight !== height) {
        setHeight(height);
      }
    }, 100);
    return () => {
      clearInterval(interval);
    }
  }, []);

  const style = {
    height: `${height}px`,
    left: '0',
    right: '0',
    top: '-130px'
  }

  const node = findSelectedNodeWithType(state.schema.nodes.media, state);

  return (<>
    {node && node.attrs.media_id && <MediaMenuTool style={{ position: 'absolute', top: '-70px', left: '10px' }}>
      <BtnGroup>
        <Button
          type="button"
          style={{
            marginRight: '1px',
            borderTopRightRadius: '0',
            borderBottomRightRadius: '0',
            opacity: node.attrs.size !== 'small' ? '.6' : '1'
          }}
          onClick={() => {
            const attr = Object.assign({}, node.attrs, {
              size: 'full'
            });
            setBlockType(state.schema.nodes.media, attr)(state, dispatch);
          }}
        >
          <FullIcon style={{ width: '20px', height: '20px', color: '#333' }} />
        </Button>
        <Button
          type="button"
          style={{
            borderTopLeftRadius: '0',
            borderBottomLeftRadius: '0',
            opacity: node.attrs.size === 'small' ? '.6' : '1',
          }}
          onClick={() => {
            const attr = Object.assign({}, node.attrs, {
              size: 'small'
            });
            setBlockType(state.schema.nodes.media, attr)(state, dispatch);
          }}
        ><CenterIcon style={{ width: '20px', height: '20px', color: '#333' }} /></Button>
      </BtnGroup>
    </MediaMenuTool>}
    {(!node || !node.attrs.media_id) && <MediaMenu style={style}>
      <MediaDropArea mediaType="image"
        onChange={(items) => {
          const nodes = items.map((item) => {
            const { media_edited: src, media_id } = item;
            return state.schema.nodes.media.createAndFill({
              src, media_id, id: uuid()
            });
          });
          const { selection } = state
          const { $anchor } = selection
          const resolvedPos = state.doc.resolve($anchor.pos) as any
          const rowNumber = resolvedPos.path[1]
          let i = 0
          const [firstNode] = findChildren(
            state.doc,
            _node => {
              if (rowNumber === i) {
                i++
                return true
              }
              i++
              return false
            },
            false
          )
          const firstIndex = firstNode.pos
          const removeTransaction = state.tr.delete(
            firstIndex,
            firstIndex + firstNode.node.content.size + 2
          )
          dispatch(removeTransaction.insert(firstIndex, nodes));
        }}
      />
    </MediaMenu>}
  </>);
}