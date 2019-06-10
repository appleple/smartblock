import * as React from 'react';
import { Schema, Node } from 'prosemirror-model';
import { EditorState } from 'prosemirror-state';
import { Extension } from '../types';
declare type OutputJson = {
    [key: string]: any;
};
declare type AppProps = {
    onChange(json: OutputJson): void;
    onInit?(json: {
        schema: Schema;
    }): void;
    json?: OutputJson;
    html?: string;
    extensions: Extension[];
    offsetTop?: number;
};
declare type AppState = {
    doc: Node;
    containerId: string;
};
export default class App extends React.Component<AppProps, AppState> {
    container: HTMLElement;
    schema: Schema;
    static defaultProps: {
        extensions: (import("..").Paragraph | import("..").Heading2 | import("..").Heading3 | import("..").ListItem | import("..").BulletList | import("..").OrderedList | import("..").Table | import("..").Underline | import("..").Strike | import("..").Strong | import("..").Link | import("../extensions/em").default | import("..").Trash | import("..").MoveUp | import("..").MoveDown)[];
        offsetTop: number;
    };
    constructor(props: any);
    getBlockSchemas(extensions: Extension[]): {};
    getBlocks(extensions: Extension[]): Extension[];
    getMarkSchemas(extensions: Extension[]): {};
    getMarks(extensions: Extension[]): Extension[];
    getEdits(extensions: Extension[]): Extension[];
    getSchemaBlockDependencies(extensions: Extension[]): {};
    getSchemaFromExtensions(extensions: Extension[]): Schema<any, any>;
    getHtmlFromNode(doc: Node, schema: Schema): string;
    getKeys(extensions: Extension[]): import("prosemirror-state").Plugin<any, any>;
    getPlugins(): any[];
    getNodeViews(): {};
    getMenu(extensions: Extension[]): Extension[];
    onChange: (state: EditorState<any>, dispatch: (tr: import("prosemirror-state").Transaction<any>) => void) => void;
    render(): JSX.Element;
}
export {};
