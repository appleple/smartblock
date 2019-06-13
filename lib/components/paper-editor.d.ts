/// <reference types="react" />
import { Schema } from 'prosemirror-model';
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
    showBackBtn?: boolean;
};
declare const _default: (props: AppProps) => JSX.Element;
export default _default;
