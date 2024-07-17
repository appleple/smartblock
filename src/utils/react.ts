import * as React from 'react';
import * as ReactDOM from 'react-dom';

export function render(element: React.ReactElement, container: HTMLElement) {
  ReactDOM.render(element, container);
}

export function unmount(container: HTMLElement) {
  ReactDOM.unmountComponentAtNode(container);

}
