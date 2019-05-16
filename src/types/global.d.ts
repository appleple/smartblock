interface VisualViewport {
  pageLeft: number;
  pageTop: number;
  width: number;
  height: number;
}

interface DocumentElement {
  clientWidth: number;
  clientHeight: number;
}

interface Window {
  visualViewport: VisualViewport;
  documentElement: DocumentElement;
  activeElement: HTMLElement | null;
}