import * as React from 'react'
import styled, { keyframes } from 'styled-components';

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
  z-index: 10;
  animation: ${fadeIn} 0.3s;
  margin-top: 8px;
  border-radius: 5px;
  box-shadow: 0 3px 40px 8px rgba(116,116,116,0.2);
`;

type FloaterState = {
  style: React.CSSProperties;
}

type FloaterProps = {
  view: any
}

class Floater extends React.Component<FloaterProps, FloaterState> {
  menuRef: React.RefObject<HTMLDivElement>;

  constructor (props) {
    super(props)

    this.state = {
      style: {
        left: 0,
        top: 0
      }
    }

    this.menuRef = React.createRef()
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

  render () {
    return (
      <FloaterStyle ref={this.menuRef} style={this.state.style}>
        {this.props.children}
      </FloaterStyle>
    )
  }

  calculateStyle (props) {
    const { view } = props

    const { selection } = view.state

    if (!selection || selection.empty) {
      return {
        left: -1000,
        top: 0
      }
    }

    const coords = view.coordsAtPos(selection.$anchor.pos)

    const { offsetWidth } = this.menuRef.current

    return {
      left: coords.left - ((window.innerWidth - 780) / 2),
      top: coords.top + 20
    }
  }
}

export default Floater