import * as React from 'react';
import { Schema } from 'prosemirror-model';
import { Node } from 'prosemirror-model';
import { Extension } from './types';
declare type OutputJson = {
    [key: string]: any;
};
declare type AppProps = {
    onChange(json: OutputJson): void;
    json?: OutputJson;
    html?: string;
    extensions: Extension[];
};
declare type AppState = {
    doc: Node;
};
export default class App extends React.Component<AppProps, AppState> {
    container: HTMLElement;
    schema: Schema;
    static defaultProps: {
        extensions: (import("./extensions/paragraph").default | import("./extensions/heading2").default | import("./extensions/heading3").default | import("./extensions/list-item").default | import("./extensions/bullet-list").default | import("./extensions/ordered-list").default | import("./extensions/table").default | import("./extensions/underline").default | import("./extensions/strike").default | import("./extensions/strong").default | import("./extensions/link").default | import("./extensions/lift").default)[];
    };
    constructor(props: any);
    getBlockSchemas(extensions: Extension[]): {};
    getBlocks(extensions: Extension[]): Extension[];
    getMarkSchemas(extensions: Extension[]): {};
    getMarks(extensions: Extension[]): Extension[];
    getSchemaBlockDependencies(extensions: Extension[]): {};
    getSchemaFromExtensions(extensions: Extension[]): Schema<any, any>;
    getHtmlFromNode(doc: Node, schema: Schema): string;
    getKeys(extensions: Extension[]): import("prosemirror-state").Plugin<any, any>;
    getPlugins(): any[];
    getNodeViews(): {};
    getMenu(extensions: Extension[]): Extension[];
    render(): JSX.Element;
}
export {};
