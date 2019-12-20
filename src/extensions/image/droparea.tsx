import React from 'react';
import MediaInsert from '../media-insert';
import MediaUpdate from '../media-update';
import DropZone from '../drop-zone';
import { MediaItem } from '../../types/media';

type MediaDropAreaProps = {
  mid: string
  thumbnail: string
  caption: string
  className: string
  mediaType: 'image' | 'file' | 'all' | 'svg'
  onChange: (items: MediaItem[]) => any
  onError: () => any
}

type MediaDropAreaState = {
  mid: string,
  tab: 'upload' | 'select',
  insertModalOpened: boolean,
  updateModalOpened: boolean,
  files: File[],
  thumbnail: string,
  landscape: boolean
}

export default class MediaDropArea extends React.Component<MediaDropAreaProps, MediaDropAreaState> {

  static defaultProps = {
    mediaType: 'image'
  }

  constructor(props) {
    super(props);
    this.state = {
      insertModalOpened: false,
      updateModalOpened: false,
      files: [],
      tab: 'upload',
      mid: props.mid,
      thumbnail: props.thumbnail,
      landscape: true
    }
  }

  componentDidMount() {
    const img = new Image();
    img.onload = () => {
      if (img.width < img.height) {
        this.setState({
          landscape: false
        })
      }
    }
    img.src = this.state.thumbnail;
  }

  onComplete = (files) => {
    this.setState({
      files: files.map(item => item.file),
      insertModalOpened: true
    })
  }

  uploadFile = (e) => {
    this.setState({
      files: Array.from(e.target.files),
      insertModalOpened: true
    });
  }

  onInsert = (items: MediaItem[]) => {
    const { mediaType } = this.props;
    const [item] = items;
    const fileOrImage = (item.media_type === 'image' || item.media_type === 'svg') ? 'image' : 'file';
    let landscape = true;
    if (item.media_size) {
      const [sizeX, sizeY] = item.media_size.split(' , ');
      if (sizeX < sizeY) {
        landscape = false;
      }
    }
    if (mediaType !== 'all' && mediaType !== fileOrImage) {
      this.props.onError();
      this.setState({
        insertModalOpened: false
      });
      return;
    }
    this.setState({
      insertModalOpened: false,
      mid: item.media_id,
      thumbnail: item.media_edited,
      landscape
    });
    this.props.onChange(items);
  }

  onClose = () => {
    this.setState({
      insertModalOpened: false
    });
  }

  onUpdateModalClose = () => {
    this.setState({
      updateModalOpened: false
    })
  }

  selectMedia = () => {
    this.setState({
      insertModalOpened: true,
      tab: 'select'
    });
  }

  onUpdateModalUpdate = (item: MediaItem) => {
    let landscape = true;
    if (item.media_size) {
      const [sizeX, sizeY] = item.media_size.split(' , ');
      if (sizeX < sizeY) {
        landscape = false;
      }
    }
    this.setState({
      updateModalOpened: false,
      mid: item.media_id,
      thumbnail: item.media_edited,
      landscape
    });
    this.props.onChange([item]);
  }

  remove = () => {
    this.setState({
      mid: ''
    });
    this.props.onChange([]);
  }

  openEditModal = () => {
    this.setState({
      updateModalOpened: true
    });
  }

  render() {
    const { insertModalOpened, updateModalOpened, files, thumbnail, mid, landscape, tab } = this.state;
    const { mediaType, caption, className } = this.props;

    return (<>
      <DropZone onComplete={this.onComplete}>
        <div>
          {!mid &&
            <div className={`acms-admin-editor-media-box ${className}`}>
              <div className="acms-admin-editor-media-icon-wrap">
                <i className="acms-admin-icon acms-admin-icon-unit-image"></i>
              </div>
              <p className="acms-admin-media-unit-droparea-text">
                新規メディアを追加
                または
                ファイルをドロップ
              </p>
              <div style={{ marginTop: '5px' }}>
                <label className="acms-admin-editor-media-btn" style={{ cursor: 'pointer' }}>アップロード
                    {!insertModalOpened && <input type="file" onChange={this.uploadFile} style={{ display: 'none' }} multiple />}
                </label>
                <button type="button" className="acms-admin-editor-media-btn" onClick={this.selectMedia}>メディアを選択</button>
              </div>
            </div>
          }
          {mid && <div className="acms-admin-media-unit-preview-wrap">
            <div className="acms-admin-media-unit-preview-overlay"></div>
            <button type="button" className="acms-admin-media-unit-preview-remove-btn" onClick={this.remove}></button>
            {(mediaType === 'image' || mediaType === 'svg') &&
              <img className="acms-admin-media-field-preview" src={`${thumbnail}`} alt="" />}
            {mediaType == 'file' &&
              <div className="acms-admin-media-unit-file-icon-wrap">
                <img className="acms-admin-media-unit-file-icon" src={`${thumbnail}`} alt="" />
                <p className="acms-admin-media-unit-file-caption">{caption}</p>
              </div>}
            <button type="button" className="acms-admin-media-edit-btn acms-admin-media-unit-preview-edit-btn" onClick={() => this.openEditModal(mid)}>編集</button>
          </div>}
        </div>
      </DropZone>
      {insertModalOpened && <MediaInsert
        onInsert={this.onInsert}
        {...(files.length ? { files } : {})}
        onClose={this.onClose}
        tab={tab}
        filetype={mediaType} />
      }
      {updateModalOpened && <MediaUpdate
        mid={`${mid}`}
        onClose={this.onUpdateModalClose}
        onUpdate={this.onUpdateModalUpdate}
      />}
    </>
    )
  }
}