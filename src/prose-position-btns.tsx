import * as React from 'react';
import styled, { keyframes } from 'styled-components';
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { setTextSelection, findChildren } from 'prosemirror-utils';
import { EditorState, Transaction } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import map from 'lodash/map';
import {
  faArrowUp,
  faArrowDown,
  faTrash
} from '@fortawesome/fontawesome-free-solid'
import { Node } from 'prosemirror-model';
import { getOffset } from './utili';

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

const ButtonStyle = styled.button`
  ${props => {
    if (props.active) {
      return `
        color: blue;
      `;
    } else {
      return `
      color: #777;
      `
    }
  }}
  ${props => {
    if (props.disabled) {
      return `
        opacity: .4;
      `;
    }
  }}
  background: #fff;
  border: none;
  appearance: none;
  -webkit-appearance: none;
  font-size: 20px;
  cursor: pointer;
  padding: 5px 10px;
  margin-right: 5px;
  text-align: center;
`;

const Button = ({ state, dispatch }: Partial<EditorView>) => (item, key: string) => {

  return (<ButtonStyle
    key={key}
    type={'button'}
    active={item.active && item.active(state)}
    title={item.title}
    disabled={item.enable && !item.enable(state)}
    onMouseDown={e => {
      e.preventDefault()
      item.run(state, dispatch)
    }}
  >{item.content}</ButtonStyle>
)};

const findNodePosition = (doc: Node, target: Node) => {
  let ret = -1;
  doc.descendants((node, pos) => {
    if (node.eq(target)) {
      ret = pos;
    }
  });
  return ret;
}

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

  moveSectionDown() {
    const { view } = this.props;
    const { state } = view;
    const { selection } = state;
    const { $anchor } = selection;
    const resolvedPos = state.doc.resolve($anchor.pos) as any;
    const rowNumber = resolvedPos.path[1];
    let i = 0;
    const [ firstNode, secondNode ] = findChildren(state.doc, (_node) => {
      if (rowNumber === i || rowNumber + 1 === i) {
        i++;
        return true;
      }
      i++;
      return false;
    }, false);
    if (secondNode) {
      const firstIndex = firstNode.pos;
      const secondIndex = secondNode.pos;
      const removeTransaction = state.tr.delete(firstIndex, secondIndex);
      view.dispatch(removeTransaction);
      const firstNode2 = removeTransaction.doc.content.child(rowNumber);
      const firstIndex2 = findNodePosition(removeTransaction.doc, firstNode2);
      const insertTransaction = view.state.tr.insert(firstIndex2 + firstNode2.nodeSize, firstNode.node);
      view.dispatch(insertTransaction);
      view.dispatch(setTextSelection(firstIndex2 + firstNode2.nodeSize)(view.state.tr));
      view.state.tr.scrollIntoView();
    }
  }

  deleteSelection() {
    const { view } = this.props;
    const { state } = view;
    const { selection } = state;
    const { $anchor } = selection;
    const resolvedPos = state.doc.resolve($anchor.pos) as any;
    const rowNumber = resolvedPos.path[1];
    let i = 0;
    const [ firstNode ] = findChildren(state.doc, (_node) => {
      if (rowNumber === i) {
        i++;
        return true;
      }
      i++;
      return false;
    }, false);
    const firstIndex = firstNode.pos;
    const removeTransaction = state.tr.delete(firstIndex, firstIndex + firstNode.node.content.size + 2);
    view.dispatch(removeTransaction);
  }

  moveSectionUp() {
    const { view } = this.props;
    const { state } = view;
    const { selection } = state;
    const { $anchor } = selection;
    const resolvedPos = state.doc.resolve($anchor.pos) as any;
    const rowNumber = resolvedPos.path[1] as number;
    let i = 0;
    const [ firstNode, secondNode ] = findChildren(state.doc, (_node) => {
      if (rowNumber === i || rowNumber - 1 === i) {
        i++;
        return true;
      }
      i++;
      return false;
    }, false);
    if (firstNode) {
      const firstIndex = firstNode.pos;
      const secondIndex = secondNode.pos;
      const removeTransaction = state.tr.delete(firstIndex, secondIndex);
      view.dispatch(removeTransaction);
      const firstNode2 = removeTransaction.doc.content.child(rowNumber - 1);
      const firstIndex2 = findNodePosition(removeTransaction.doc, firstNode2);
      const insertTransaction = view.state.tr.insert(firstIndex2 + firstNode2.nodeSize, firstNode.node);
      view.dispatch(insertTransaction);
      view.dispatch(setTextSelection(firstIndex2)(view.state.tr));
      view.state.tr.scrollIntoView();
    }
  }
 
  render() {
    const { style } = this.state;
    const { menu, view } = this.props;

    return (<PositionBtnGroup style={style} ref={this.menuRef}>
      {map(menu, (item, key) => (
        <span key={key}>
          {map(item, Button(view))}
        </span>
      ))}
      <ButtonStyle onClick={this.moveSectionUp.bind(this)}>
        <FontAwesomeIcon icon={faArrowUp} />
      </ButtonStyle>
      <ButtonStyle onClick={this.moveSectionDown.bind(this)}>
        <FontAwesomeIcon icon={faArrowDown} />
      </ButtonStyle>
      <ButtonStyle onClick={this.deleteSelection.bind(this)}>
        <FontAwesomeIcon icon={faTrash} />
      </ButtonStyle>
    </PositionBtnGroup>)
  }
}