import * as React from 'react';
import ImageIcon from './image-icon';
import { blockActive, findSelectedNodeWithType } from '../../utils';
import { Extension, Dispatch } from '../../types'
import { setBlockType } from 'prosemirror-commands';
import * as uuid from 'uuid/v4'
import { EditorState } from 'prosemirror-state';
import { MediaPlugin } from './plugins';
import { hasClass, readFiles } from './util';
import Button from '../../components/button';
import FullIcon from './full-icon';
import CenterIcon from './center-icon';
import ImagePlusIcon from './image-plus-icon';

export default class Image extends Extension {
  imgClassName: string;
  imgFullClassName: string;
  captionClassName: string;
  onChange: (preview: string, file: File) => Promise<string> = (preview) => Promise.resolve(preview);

  constructor(props) {
    super(props);
    this.imgClassName = props.imgClassName;
    this.imgFullClassName = props.imgFullClassName;
    this.captionClassName = props.captionClassName;
    if (props.onChange) {
      this.onChange = props.onChange;
    }
  }
  get name() {
    return "image";
  }
  get showMenu() {
    return true;
  }
  get group() {
    return "block";
  }
  get hideBlockMenuOnFocus() {
    return true;
  }
  get schema() {
    const imgClassName = this.imgClassName;
    return {
      content: "inline*",
      isolating: true,
      group: "block",
      selectable: true,
      attrs: {
        src: { default: "" },
        size: { default: "" },
        id: { default: "" },
        caption: { default: "" }
      },
      parseDOM: [
        {
          tag: "figure",
          getAttrs(dom) {
            const img = dom.querySelector("img");
            if (!img) {
              return {}
            }
            return {
              src: img.getAttribute("src"),
              id: img.getAttribute("id"),
              size: hasClass(img, imgClassName) ? 'small' : 'full'
            }
          }
        },
        {
          tag: "img",
          getAttrs(dom) {
            return {
              src: dom.getAttribute("src"),
              id: dom.getAttribute("id"),
              size: hasClass(dom, imgClassName) ? 'small' : 'full'
            }
          }
        }
      ],
      toDOM: (node) => {
        return [
          "figure",
          {
            "class": this.className,
          }, ["img", {
            src: node.attrs.src,
            "class": node.attrs.size === "full" ? this.imgFullClassName : this.imgClassName,
            id: node.attrs.id || uuid(),
          }],
          ["figcaption", {"class": this.captionClassName}, 0],
        ];
      }
    };
  }
  get icon() {
    return <ImageIcon style={{ width: "24px", height: "24px" }} />;
  }
  get plugins() {
    return [MediaPlugin()]
  }
  async changeImage(state: EditorState, dispatch: Dispatch, files: FileList) {
    const items = await readFiles(files);
    const [item] = items;
    if (!item) {
      return;
    }
    if (this.onChange) {
      const success = await this.onChange(item.preview, item.file);
      if (success) {
        setBlockType(state.schema.nodes.image, {
          src: success
        })(state, dispatch);
      }
    }
  }
  customButton({ state, dispatch }) {
    const disabled = (this.enable && !this.enable(state)) || this.hideMenuOnFocus;
    return (<Button 
      tag="label"
      active={this.active && this.active(state)}
      disabled={disabled}
    >
      {this.icon}
      {!disabled && <input type="file" style={{ display: 'none' }} onChange={(e) => {
        this.changeImage(state, dispatch, e.target.files);
      }} />}
    </Button>)
  }
  customMenu({ state, dispatch }) {
    const node = findSelectedNodeWithType(state.schema.nodes.image, state);
    return (
      <>
        <Button 
          type="button" 
          style={{
            marginRight: '1px',
            borderTopRightRadius: '0',
            borderBottomRightRadius: '0',
            opacity: node.attrs.size !== 'small' ? '.6' : '1'
          }}
          onClick={() => {
            const attr = Object.assign({}, node.attrs, {
              size: 'full'
            });
            setBlockType(state.schema.nodes.media, attr)(state, dispatch);
          }}
        >
          <FullIcon style={{ width: '24px', height: '24px' }} />
        </Button>
        <Button 
          type="button" 
          style={{
            borderTopLeftRadius: '0',
            borderBottomLeftRadius: '0',
            opacity: node.attrs.size === 'small' ? '.6' : '1',
          }}
          onClick={() => {
            const attr = Object.assign({}, node.attrs, {
              size: 'small'
            });
            setBlockType(state.schema.nodes.media, attr)(state, dispatch);
          }}
        ><CenterIcon style={{ width: '24px', height: '24px' }} /></Button>
        <Button tag="label">
          <ImagePlusIcon style={{ width: '24px', height: '24px' }} />
          <input type="file" style={{ display: 'none' }} onChange={(e) => {
            this.changeImage(state, dispatch, e.target.files);
          }} />
        </Button>
      </>
    );
  }
  active(state) {
    return blockActive(state.schema.nodes.image)(state);
  }
  enable(state) {
    return setBlockType(state.schema.nodes.image)(state);
  }
}