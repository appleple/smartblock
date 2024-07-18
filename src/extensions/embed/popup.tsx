import * as React from 'react'
import { createPortal } from 'react-dom'
import CheckIcon from '../../components/icons/check'

const { useState, useEffect, useRef } = React

function usePortal() {
  const rootRef = React.useRef<HTMLDivElement | null>(document.createElement('div'))

  useEffect(function setupElement() {
    // let root: HTMLDivElement | null = rootRef.current
    // Look for existing target dom element to append to
    const parent = document.createElement('div')
    document.body.appendChild(parent)
    // Add the detached element to the parent
    parent.appendChild(rootRef.current)
    // This function is run on unmount
    return function removeElement() {
      document.body.removeChild(parent)
    }
  }, [])

  return rootRef.current
}

interface ModalProps {
  children: React.ReactNode
  container?: HTMLElement
}

const Modal = (props: ModalProps) => {
  if (!props.container) {
    return null
  }
  return createPortal(props.children, props.container)
}

interface PopupProps {
  url?: string
  onDone?: (url: string) => void
  onClose?: () => void
}

export default function Popup(props: PopupProps) {
  const [url, setUrl] = useState(props.url || '');
  const input = useRef<HTMLInputElement>(null);
  const container = usePortal()

  useEffect(() => {
    input.current?.focus()
  }, [])

  return (
    <Modal container={container}>
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
