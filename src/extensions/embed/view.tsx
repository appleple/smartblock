import * as React from 'react';
import Popup from './popup';

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
      return (<div contentEditable className="youtube-iframe-wrap">
        <div className="youtube-iframe">
          <iframe src={url} />
        </div>
      </div>)
    }
  }
  return (<><div className="embed-wrap">
    <div className="embed">
      <div className="embed-inner">
        {node.attrs.src}
        <button onClick={() => {
          setShowPopup(true);
        }}>編集</button>
      </div>
    </div>
  </div>
    {showPopup && <Popup
      url={node.attrs.url}
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