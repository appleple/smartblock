import * as React from 'react';
import { Root } from 'react-dom/client';
interface ReactRootElement extends HTMLElement {
    _reactRoot?: Root;
}
export declare function render(element: React.ReactElement, container: ReactRootElement): void;
export declare function unmount(container: ReactRootElement): void;
export {};
