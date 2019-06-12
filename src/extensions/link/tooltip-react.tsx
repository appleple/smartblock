import * as React from 'react'
import styled from 'styled-components'
import CheckIcon from '../../components/icons/Check'

const Tooltip = styled.div`
  position: absolute;
  display: inline-block;
  z-index: 1000;
  background-color: #fff;
  color: #777;
  font-size: 16px;
  box-shadow: 0 3px 40px 8px rgba(116, 116, 116, 0.2);
  border-radius: 3px;
  width: 320px;
  line-height: 35px;
  display: block;
  height: 35px;
  &:before {
    position: absolute;
    left: 20px;
    top: -12px;
    content: '';
    display: block;
    border-style: solid;
    border-width: 0 11.5px 12px 11.5px;
    border-color: transparent transparent #ffffff transparent;
  }
`

const TooltipInner = styled.div`
  display: flex;
  height: 35px;
`

const Label = styled.label`
  display: block;
  transition: background-color 0.3s;
  vertical-align: middle;
  flex: 1;
`

const Input = styled.input`
  border: none;
  display: block;
  padding: 0 10px;
  font-size: 16px;
  flex: 1;
  &:focus {
    outline: none;
  }
`

const Button = styled.button`
  border: none;
  background-color: #014cc5;
  width: 38px;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
`

type TooltipReactProps = {
  style: React.CSSProperties
  url: string
  onClick(url: string): void
  editing: boolean
}

type TooltipReactState = {
  newUrl: string
}

export default class TooltipReact extends React.Component<
  TooltipReactProps,
  TooltipReactState
> {
  static defaultProps = {
    editing: false
  }

  constructor(props) {
    super(props)
    this.state = {
      newUrl: props.url
    }
  }

  componentWillReceiveProps(nextProps, prevProps) {
    if (nextProps.url !== prevProps.url) {
      this.setState({
        newUrl: nextProps.url
      })
    }
  }

  enterUrl = () => {
    this.props.onClick(this.state.newUrl)
  }

  render() {
    const { style, editing } = this.props
    const { newUrl } = this.state

    if (!editing) {
      return null
    }

    return (
      <Tooltip style={style}>
        <TooltipInner>
          <Input
            type="text"
            value={newUrl}
            placeholder="例）https://〜"
            onKeyDown={e => {
              if (e.key === 'Enter') {
                this.enterUrl()
              }
            }}
            onChange={e => {
              this.setState({
                newUrl: e.target.value
              })
            }}
          />
          <Button onClick={this.enterUrl}>
            <CheckIcon style={{ width: '24px', height: '24px' }} />
          </Button>
        </TooltipInner>
      </Tooltip>
    )
  }
}
