import * as React from 'react';
import map from 'lodash/map';
import styled from 'styled-components';

const ButtonStyle = styled.button`
  ${props => {
    if (props.active) {
      return `
        color: #000;
      `;
    }
  }}
  background: #fff;
  border: solid 1px #7c8990;
  font-size: inherit;
  cursor: pointer;
  color: #777;
  border-radius: 50%;
  padding: 5px 10px;
  width: 40px;
  height: 40px;
  margin-right: 5px;
  text-align: center;
`;

const Bar = styled.div`
  margin-bottom: 5px;
  display: flex;
  align-items: baseline;
  justify-content: center;
  font-size: 24px;
  border-top: 1px solid #7c8990;
  padding-top: 10px;
`;


const Button = ({ state, dispatch }) => (item, key) => (
  <ButtonStyle
    key={key}
    type={'button'}
    active={item.active && item.active(state)}
    title={item.title}
    onMouseDown={e => {
      e.preventDefault()
      item.run(state, dispatch)
    }}
  >{item.content}</ButtonStyle>
)

const MenuBar = ({ menu, children, view }: { menu: any, children?: React.ReactChildren, view: any}) => (
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