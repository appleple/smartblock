import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createRoot, Root } from 'react-dom/client';

interface ReactRootElement extends HTMLElement {
  _reactRoot?: Root;
}

const isReact18 = parseInt(ReactDOM.version.split('.')[0], 10) >= 18;

export function render(element: React.ReactElement, container: ReactRootElement) {
  if (isReact18) {
    if (!container._reactRoot) {
      container._reactRoot = createRoot(container);
    }
    container._reactRoot.render(element);
  } else {
    ReactDOM.render(element, container);
  }
}

export function unmount(container: ReactRootElement) {
  if (isReact18 && container._reactRoot) {
    container._reactRoot.unmount();
    container._reactRoot = null;
  } else {
    ReactDOM.unmountComponentAtNode(container);
  }
}
