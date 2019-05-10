import * as React from 'react';
import map from 'lodash/map';
import styled, { keyframes } from 'styled-components';
import { EditorView } from 'prosemirror-view';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const FloaterStyle = styled.div`
  position: absolute;
  z-index: 12;
  animation: ${fadeIn} 0.3s;
  margin-top: 8px;
  border-radius: 5px;
  background-color: #FFF;
  box-shadow: 0 3px 40px 8px rgba(116,116,116,0.2);
`;

const ButtonStyle = styled.button`
  ${props => {
    if (props.active) {
      return `
        color: #000;
      `;
    }
  }}
  background: #fff;
  border: none;
  font-size: inherit;
  cursor: pointer;
  color: #777;
  border-radius: 0;
  padding: 5px 10px;
`;

const Bar = styled.div`
  margin-bottom: 5px;
  display: flex;
  align-items: baseline;
`;


const Button = ({ state, dispatch }) => (item, key) => (
  <ButtonStyle
    key={key}
    type={'button'}
    active={item.active && item.active(state)}
    title={item.title}
    disabled={item.enable && !item.enable(state)}
    onMouseDown={e => {
      e.preventDefault()
      item.onClick(state, dispatch)
    }}
  >{item.icon}</ButtonStyle>
)

const calculateStyle = (view) => {
  const { selection } = view.state

  if (!selection || selection.empty) {
    return {
      left: -1000,
      top: 0
    }
  }

  const coords = view.coordsAtPos(selection.$anchor.pos);
  const app = document.querySelector('#container') as HTMLDivElement;
  const width = app.offsetWidth;

  return {
    left: coords.left - ((window.innerWidth - width) / 2),
    top: coords.top + 20
  }
}

const MenuBar = ({ menu, children, view }: { menu: any, children?: React.ReactChildren, view: EditorView}) => {
  const style = calculateStyle(view);

  return (<FloaterStyle style={style}>
    <Bar>
      {children}
      {map(menu, (item, key) => (
        <span key={key}>
          {map(item, Button(view))}
        </span>
      ))}
    </Bar>
    </FloaterStyle>)
}

export default MenuBar