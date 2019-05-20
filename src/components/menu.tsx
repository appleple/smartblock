import * as React from 'react';
import styled, { keyframes } from 'styled-components';
import { findChildren } from 'prosemirror-utils';
import { EditorView } from 'prosemirror-view';
import map from 'lodash/map';
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

const PositionBtnGroup = styled.div`
  position: absolute;
  z-index: 10;
  max-width: 280px;
  animation: ${fadeIn} 0.3s;
  border-radius: 5px;
  box-shadow: 0 3px 40px 8px rgba(116,116,116,0.2);
  padding: 10px 0;
  overflow: hidden;
  background-color: #FFF;
`;

const Button = (view) => (item, key: string) => {
  const { state, dispatch } = view;
  return (<ButtonStyle
    key={key}
    type={'button'}
    active={item.active && item.active(state)}
    title={item.title}
    disabled={item.enable && !item.enable(state)}
    onMouseDown={e => {
      e.preventDefault()
      item.onClick(state, dispatch, view)
    }}
  >{item.icon}</ButtonStyle>
)};

interface PositionProps {
  view: EditorView,
  menu: any
}

interface PositionState {
  style: React.CSSProperties;
}

export default class PositionBtns extends React.Component<PositionProps, PositionState> {
  menuRef: React.RefObject<HTMLDivElement>;

  constructor(props) {
    super(props);
    this.state = {
      style: {
        left: 0,
        top: 0
      }
    }
    this.menuRef = React.createRef();
  }

  calculateStyle (props: PositionProps) {
    const { view } = this.props;
    const { state } = view;
    const { selection } = state;

    if (!selection) {
      return {
        left: -1000,
        top: 0
      }
    }

    const { $anchor } = selection;
    const resolvedPos = state.doc.resolve($anchor.pos) as any;
    const rowNumber = resolvedPos.path[1];
    let i = 0;
    const [ firstNode ] = findChildren(state.doc, (_node) => {
      if (rowNumber === i || rowNumber + 1 === i) {
        i++;
        return true;
      }
      i++;
      return false;
    }, false);

    if (!firstNode) {
      return {
        top: -1000
      }
    }

    const coords = view.coordsAtPos(firstNode.pos);
    const dom = view.nodeDOM(firstNode.pos) as HTMLElement;
    const elementTop = getOffset(dom).top;
    
    if (coords.top === 0) {
      return {
        top: -1000
      }
    } else if (dom && dom.offsetHeight) {
      return {
        right: 0,
        top: elementTop + dom.offsetHeight
      }
    } else {
      return {
        right: 0,
        top: elementTop
      }
    }
  }

  componentDidMount () {
    this.setState({
      style: this.calculateStyle(this.props)
    })
  }

  componentWillReceiveProps (nextProps) {
    this.setState({
      style: this.calculateStyle(nextProps)
    })
  }

  getActiveMenu() {
    const { menu, view } = this.props;
    const { state } = view;

    const activeItem = menu.blocks.find((item) => {
      if (item.active && item.active(state)) {
        return true;
      }
      return false;
    });
    if (activeItem && activeItem.customMenu) {
      return <>{activeItem.customMenu(view)}</>;
    }
    return (<></>);
  }
 
  render() {
    const { style } = this.state;
    const { menu, view } = this.props;
    const CustomMenu = this.getActiveMenu();

    return (<PositionBtnGroup style={style} ref={this.menuRef}>
      {map(menu, (item, key) => (
        <span key={key}>
          {map(item, Button(view))}
        </span>
      ))}
      {(CustomMenu && CustomMenu.props && CustomMenu.props.children) && 
      <div style={{ borderTop: '1px solid #CCC', paddingTop: '10px' }}>
        {CustomMenu}
      </div>}
    </PositionBtnGroup>)
  }
}