import * as React from 'react';
import map from 'lodash/map';
import styled from 'styled-components';
import { EditorView } from 'prosemirror-view';

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

const MenuBar = ({ menu, children, view }: { menu: any, children?: React.ReactChildren, view: EditorView}) => (
  <Bar>
    {children && (
      <span>
        {children}
      </span>
    )}

    {map(menu, (item, key) => (
      <span key={key}>
        {map(item, Button(view))}
      </span>
    ))}
  </Bar>
)

export default MenuBar