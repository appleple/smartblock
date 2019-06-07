import * as React from 'react';
import map from 'lodash/map';
import styled, { keyframes } from 'styled-components';
import { EditorView } from 'prosemirror-view';
import { getOffset } from '../utils';
import ButtonStyle from './button';

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
  color: #FFF;
  box-shadow: 0 3px 40px 8px rgba(116,116,116,0.2);
  &:before {
    position: absolute;
    left: 20px;
    top: -12px;
    content: "";
    display: block;
    border-style: solid;
    border-width: 0 11.5px 12px 11.5px;
    border-color: transparent transparent #ffffff transparent;
  }
`;

const Bar = styled.div`
  padding: 5px;
  display: flex;
  align-items: baseline;
`;

const calculateStyle = (view: EditorView, offsetTop, width) => {
  const { selection } = view.state

  if (!selection || selection.empty) {
    return {
      left: -1000,
      top: 0
    }
  }

  const dom = view.domAtPos(selection.$anchor.pos);
  const flag = dom.node instanceof Element;
  const element = flag ? dom.node as HTMLElement : dom.node.parentElement;
  const elementTop = getOffset(element).top;

  const coords = view.coordsAtPos(selection.$anchor.pos);
  

  if (window.innerWidth <= 767) {
    return {
      left: 5,
      top: elementTop + element.offsetHeight - offsetTop + 10
    }
  } 

  return {
    left: coords.left - ((window.innerWidth - width) / 2),
    top: elementTop + element.offsetHeight - offsetTop + 10
  }
}

const getContainerOffset = (container) => {
  return getOffset(container).top;
}

const getContainerWidth = (container) => {
  return container.offsetWidth;
}

const MenuBar = ({ menu, children, view }: { menu: any, children?: React.ReactChildren, view: EditorView }) => {
  const offsetTop = getContainerOffset(view.dom);
  const width = getContainerWidth(view.dom);
  const style = calculateStyle(view , offsetTop, width);
  const { state, dispatch } = view;

  return (<FloaterStyle style={style}>
    <Bar>
      {children}
      {menu.map((item, key) => {
        return(<ButtonStyle
          key={`inline-${key}`}
          type={'button'}
          active={item.active && item.active(state)}
          title={item.title}
          disabled={item.enable && !item.enable(state)}
          onMouseDown={e => {
            e.preventDefault()
            item.onClick(state, dispatch)
          }}
        >{item.icon}</ButtonStyle>);
      })}
    </Bar>
    </FloaterStyle>)
}

export default MenuBar