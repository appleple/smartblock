import * as React from 'react';
import styled from 'styled-components';

const Tooltip = styled.div`
  position: absolute;
  display: inline-block;
  z-index: 1000;
  background-color: #FFF;
  width: 250px;
  padding: 5px;
  font-size: 16px;
  box-shadow: 0 3px 40px 8px rgba(116,116,116,0.2);
  border-radius: 5px;
`;

type TooltipReactProps = {
  style: React.CSSProperties
  url: string,
  onClick(url: string): void
}

type TooltipReactState = {
  newUrl: string,
  editing: boolean
}

export default class TooltipReact extends React.Component<TooltipReactProps, TooltipReactState> {
  constructor(props) {
    super(props);
    this.state = {
      newUrl: props.url,
      editing: false
    }
  }

  componentWillReceiveProps(nextProps, prevProps) {
    if (nextProps.url !== prevProps.url) {
      this.setState({
        newUrl: nextProps.url
      })
    }
  }

  render() {
    const { style } = this.props;
    const { newUrl, editing } = this.state;

    return (<Tooltip style={style}>
      {editing && <>
        <input 
          type="text" 
          value={newUrl} 
          placeholder="https://"
          onChange={(e) => {
            this.setState({
              newUrl: e.target.value
            })
          }} 
        />
        <button onClick={() => {
          this.setState({
            editing: false
          })
          this.props.onClick(this.state.newUrl);
        }}>OK</button>
      </>}
      {!editing && <>
        {newUrl}
        <button onClick={() => {
          this.setState({
            editing: true
          })
        }}>編集</button>
      </>}
    </Tooltip>);
  }
}