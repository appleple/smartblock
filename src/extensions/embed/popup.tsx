import * as React from 'react';
import styled from 'styled-components';

const PopupText = styled.p`
  text-align: center;
  color: #666;
  text-align: center;
  margin-bottom: 15px;
  font-size: 14px;
`

const Popup = styled.div`
  position: absolute;
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
    border: 1px solid #eee;
    padding: 0 5px;
  }
`;

export default (props) => {
  const [url, setUrl] = React.useState('');
  return (<Popup id="popup" onClick={(e) => {
    const target = e.target as HTMLDivElement;
    if (target.id === "popup" && props.onClose) {
      props.onClose();
    }
  }}>
    <PopupInnder>
      <PopupText>埋め込みリンク用のURLを入力してください</PopupText>
      <input 
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
    </PopupInnder>
  </Popup>)
}