import CodeMirror from "codemirror";
import { Node } from "prosemirror-model";
import { EditorView } from "prosemirror-view";
import { TextSelection } from "prosemirror-state";
import "codemirror/lib/codemirror.css";
import "codemirror/mode/javascript/javascript";
export default class CodeBlockView {
    node: Node;
    view: EditorView;
    getPos: () => number;
    incomingChanges: boolean;
    cm: CodeMirror.Editor;
    dom: HTMLElement;
    updating: boolean;
    constructor(node: any, view: any, getPos: any);
    forwardSelection(): void;
    asProseMirrorSelection(doc: any): TextSelection<any>;
    setSelection(anchor: any, head: any): void;
    valueChanged(): void;
    codeMirrorKeymap(): any;
    maybeEscape(unit: any, dir: any): any;
    update(node: any): boolean;
    selectNode(): void;
    stopEvent(): boolean;
}
