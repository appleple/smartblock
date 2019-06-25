import * as React from 'react';
import styled from 'styled-components';
import CheckIcon from '../../components/icons/Check'

const PopupText = styled.p`
  margin: 0 0 15px 0;
  color: #333;
  font-size: 16px;
`

const Popup = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
`;

const PopupInnder = styled.div`
  flex-basis: 380px;
  background: #FFF;
  border-radius: 3px;
  box-shadow: 0 3px 10px 4px rgba(116, 116, 116, 0.2);
  padding: 15px;
  box-sizing: border-box;
  input {
    display: block;
    flex: 1;
    width: 100%;
    padding: 0 5px;
    font-size: 16px;
    line-height: 30px;
    box-sizing: border-box;
    border-radius: 3px 0 0 3px;
    border: 1px solid #eee;
  }
  
  input:focus {
    outline: 0;
    border: 1px solid #137af3;
    box-shadow: 0 0 0 2px rgba(19,122,243,.4), inset 0 1px 1px rgba(0,0,0,.1);
  }
`;

const PopupTextField = styled.div`
  display: flex;
`;

const Button = styled.button`
  width: 38px;
  height: 38px;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
  border-radius: 0 3px 3px 0;
  border: 1px solid transparent;
  background-color: #014cc5;
  
  &:focus {
    outline: 0;
    border: 1px solid #137af3;
    box-shadow: 0 0 0 2px rgba(19,122,243,.4), inset 0 1px 1px rgba(0,0,0,.1);
  }
`

const { useState, useEffect, useRef } = React;

export default (props) => {
  const [url, setUrl] = useState('');
  const input = useRef<HTMLInputElement>();
  useEffect(() => {
    input.current.focus();
  });
  return (<Popup id="popup" onClick={(e) => {
    const target = e.target as HTMLDivElement;
    if (target.id === "popup" && props.onClose) {
      props.onClose();
    }
  }}>
    <PopupInnder>
      <PopupText>埋め込みリンク用のURLを入力してください</PopupText>
      <PopupTextField>
        <input 
          ref={input}
          type="text" 
          value={url} 
          placeholder="https://"
          onKeyDown={(e) => {
            if (e.keyCode === 13 && props.onDone) {
              props.onDone(url);
            }
          }}
          onChange={(e) => {
            setUrl(e.target.value);
          }}
        />
        <Button onClick={(e) => {
          if (props.onDone) {
            props.onDone(url);
          }
        }}>
          <CheckIcon style={{ width: '24px', height: '24px', overflow: 'hidden' }} />
        </Button>
      </PopupTextField>
    </PopupInnder>
  </Popup>)
}