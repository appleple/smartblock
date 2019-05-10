import * as React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/fontawesome-free-solid'
import { Extension } from '../types';
import { setBlockType } from 'prosemirror-commands';

class MediaComponent extends React.Component {

  onChange(e) {
    console.log(e);
  }

  render() {
    return (<div>
      ファイルを選択!!
      <input type="text" />
      <input type="file" onChange={this.onChange.bind(this)} />
      <button>click!</button>
    </div>)
  }
}

export default class Media implements Extension {
  get name() {
    return 'media';
  }
  get showMenu() {
    return true;
  }
  get schema() {
    return {
      content: 'inline*',
      group: 'block',
      parseDOM: [{tag: "media"}],
      toDOM() { return ["media", 0] }
    }
  }
  get icon() {
    return <FontAwesomeIcon icon={faImage} />
  }
  onClick (state, dispatch) {
    setBlockType(state.schema.nodes.media)(state, dispatch);
  }
  render(node) {
    return <MediaComponent />
  }
}