import * as React from 'react'
import { createPortal } from 'react-dom'
import CheckIcon from '../../components/icons/check'

const { useState, useEffect, useRef } = React

function usePortal() {
  const rootElemRef = React.useRef(document.createElement('div'))

  useEffect(function setupElement() {
    // Look for existing target dom element to append to
    const parentElem = document.createElement('div')
    document.body.appendChild(parentElem)
    // Add the detached element to the parent
    parentElem.appendChild(rootElemRef.current)
    // This function is run on unmount
    return function removeElement() {
      parentElem.removeChild(rootElemRef.current)
    }
  }, [])

  return rootElemRef.current
}

const Modal = props => {
  const target = usePortal()
  return createPortal(props.children, target)
}

export default props => {
  const [url, setUrl] = useState(props.url);
  const input = useRef<HTMLInputElement>();

  useEffect(() => {
    input.current.focus()
  })
  return (
    <Modal>
      <div
        className="smartblock-popup"
        id="smartblock-popup"
        onClick={e => {
          const target = e.target as HTMLDivElement
          if (target.id === 'smartblock-popup' && props.onClose) {
            props.onClose()
          }
        }}
      >
        <div className="smartblock-popup-inner">
          <div className="smartblock-popup-text">Enter URL here...</div>
          <div className="smartblock-popup-field">
            <input
              ref={input}
              type="text"
              value={url}
              placeholder="https://"
              onKeyDown={e => {
                if (e.keyCode === 13 && props.onDone) {
                  props.onDone(url)
                }
              }}
              onChange={e => {
                setUrl(e.target.value)
              }}
            />
            <button
              className="smartblock-popup-btn"
              onClick={e => {
                if (props.onDone) {
                  props.onDone(url)
                }
              }}
            >
              <CheckIcon
                style={{ width: '24px', height: '24px', overflow: 'hidden' }}
              />
            </button>
          </div>
        </div>
      </div>
    </Modal>
  )
}
