import * as React from 'react';
import { Schema } from 'prosemirror-model';
import { Extension } from '../types';
declare type OutputJson = {
    [key: string]: any;
};
declare type Output = {
    json: OutputJson;
    html: string;
    schema: Schema;
    markdown?: string;
};
declare type AppProps = {
    onChange?(output: Output): void;
    onTitleChange?(title: string): void;
    onInit?(json: {
        schema: Schema;
    }): void;
    json?: OutputJson;
    html?: string;
    markdown?: string;
    extensions?: Extension[];
    offsetTop?: number;
    showBackBtn?: boolean;
    autoSave?: boolean;
    showTitle?: boolean;
    titleText?: string;
    titlePlaceholder?: string;
    outputMarkdown?: boolean;
    full?: boolean;
    getEditorRef?(div: React.MutableRefObject<HTMLDivElement>): void;
};
declare const _default: (props: AppProps) => JSX.Element;
export default _default;
