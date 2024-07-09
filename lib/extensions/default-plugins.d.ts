import { Plugin } from 'prosemirror-state';
import { Extension } from '../types';
import { Node } from 'prosemirror-model';
export declare const currentElementPlugin: () => Plugin<any>;
interface PlaceholderPluginConfig {
    placeholder: ((PlaceholderProps: {
        node: Node;
        pos: number;
        hasAnchor: boolean;
    }) => string) | string;
    emptyNodeClass: string;
    emptyEditorClass: string;
}
interface PlaceholderPluginOptions extends Partial<PlaceholderPluginConfig> {
}
export declare const placeholderPlugin: (options?: PlaceholderPluginOptions) => Plugin<any>;
export type DefaultPluginsOptions = PlaceholderPluginOptions;
export type DefaultPluginsConfig = PlaceholderPluginOptions;
export default class DefaultPlugins implements Extension {
    config: DefaultPluginsConfig;
    constructor(options?: DefaultPluginsOptions);
    get name(): string;
    get showMenu(): boolean;
    get plugins(): Plugin<any>[];
}
export {};
