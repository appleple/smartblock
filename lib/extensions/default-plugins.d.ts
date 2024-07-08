import { Extension } from '../types';
export default class DefaultPlugins implements Extension {
    placeholder: string;
    readonly name: string;
    readonly showMenu: boolean;
    readonly plugins: any[];
}
