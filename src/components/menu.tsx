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
  padding: 5px 0;
  color: #767676;
  background-color: #FFF;
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

const PositionBtnGroupTop = styled.div`
  padding: 0 5px 5px 5px;
`
const PositionBtnGroupBottom = styled.div`
  border-top: 1px solid #ccc;
  padding: 5px 5px 0 5px;
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
  offsetTop: number,
  menu: any
}

interface PositionState {
  style: React.CSSProperties;
}

export default class Menu extends React.Component<PositionProps, PositionState> {
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
    const { view, offsetTop } = this.props;
    const { state } = view;
    const { selection } = state;

    if (!selection || !selection.empty) {
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
        left: 5,
        top: elementTop + dom.offsetHeight - offsetTop + 10
      }
    } else {
      return {
        left: 5,
        top: elementTop- offsetTop + 10
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
      <PositionBtnGroupTop>
        {map(menu, (item, key) => (
          <span key={key}>
            {map(item, Button(view))}
          </span>
        ))}
      </PositionBtnGroupTop>
      {(CustomMenu && CustomMenu.props && CustomMenu.props.children) && 
      <PositionBtnGroupBottom>
        {CustomMenu}
      </PositionBtnGroupBottom>}
    </PositionBtnGroup>)
  }
}