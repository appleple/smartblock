import { Extension } from '../types';
import 'prosemirror-tables/style/tables.css';
import 'prosemirror-gapcursor/style/gapcursor.css';
declare type Config = {
    placeholder: string;
};
export default class DefaultPlugins implements Extension {
    placeholder: string;
    constructor(config: Config);
    readonly name: string;
    readonly showMenu: boolean;
    readonly plugins: any[];
}
export {};
