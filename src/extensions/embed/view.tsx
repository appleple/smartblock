import * as React from 'react';
import styled from 'styled-components';
import Popup from './popup';
import ExternalLink from '../../components/icons/ExternalLink';

const Button = styled.button`
  background-color: #FFF;
  border: none;
  color: #ADADAD;
  margin-left: 5px;
  vertical-align: middle;
`;

const { useState } = React;

export default (props) => {
  const { node, view, pos } = props;
  const { state, dispatch } = view;
  const [showPopup, setShowPopup] = useState(false);

  if (node.attrs.src.indexOf('youtube') !== -1) {
    const { src } = node.attrs;
    let youtubeId = '';
    const matches = /www\.youtube\.com\/watch\?v=(.*?)$/.exec(src);
    if (matches && matches[1]) {
      youtubeId = matches[1];
    }
    if (!youtubeId) {
      const embedMatches = /www\.youtube\.com\/embed\/(.*?)$/.exec(src);
      if (embedMatches && embedMatches[1]) {
        youtubeId = embedMatches[1];
      }
    }
    if (youtubeId) {
      const url = `https://www.youtube.com/embed/${youtubeId}`;
      return (<div className="youtube-frame-wrap">
        <div className="youtube-frame">
          <iframe src={url} />
        </div>
      </div>)
    }
  }
  return (<><div className="embed-wrap">
    <div className="embed">
      <div className="embed-inner">
        {node.attrs.src}
        <Button onClick={() => {
          setShowPopup(true);
        }}>
          <ExternalLink style={{ width: '16px', height: '16px' }} />
        </Button>
      </div>
    </div>
  </div>
  {showPopup && <Popup
    url={node.attrs.src}
    onClose={() => {
      setShowPopup(false);
    }}
    onDone={(src) => {
      setShowPopup(false);
      dispatch(state.tr.setNodeMarkup(pos, node.type, {
        ...node.attrs, src
      }));
    }}
  />}
  </>)
}