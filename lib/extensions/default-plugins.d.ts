import { Plugin } from 'prosemirror-state';
import { Extension } from '../types';
export default class DefaultPlugins implements Extension {
    placeholder: string;
    get name(): string;
    get showMenu(): boolean;
    get plugins(): Plugin<any, any>[];
}
