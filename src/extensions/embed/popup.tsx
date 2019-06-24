import * as React from 'react';
import styled from 'styled-components';
import CheckIcon from '../../components/icons/Check'

const PopupText = styled.p`
  text-align: center;
  color: #666;
  text-align: center;
  margin-bottom: 15px;
  font-size: 14px;
`

const Popup = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
`;

const PopupInnder = styled.div`
  flex-basis: 380px;
  background: #FFF;
  border-radius: 5px;
  box-shadow: 0 3px 40px 8px rgba(116, 116, 116, 0.6);
  padding: 10px;
  box-sizing: border-box;
  input {
    font-size: 14px;
    line-height: 30px;
    display: block;
    width: 100%;
    box-sizing: border-box;
    border-radius: 5px;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    border: 1px solid #eee;
    padding: 0 5px;
  }
`;

const PopupTextField = styled.div`
  display: flex;
`;

const Button = styled.button`
  border: none;
  background-color: #014cc5;
  width: 46px;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
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