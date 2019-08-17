import Paragraph from './paragraph';
import Heading2 from './heading2';
import Heading3 from './heading3';
import ListItem from './list-item';
import BulletList from './bullet-list';
import OrderedList from './ordered-list';
import BlockQuote from './blockquote';
import Embed from './embed';
import Code from './code';
import Underline from './underline';
import Strike from './strike';
import Strong from './strong';
import Link from './link';
import Emphasis from './emphasis';
import Trash from './trash';
import MoveUp from './move-up';
import MoveDown from './move-down';
import DefaultKeys from './default-keys';
import DefaultPlugins from './default-plugins';
export default [
    // blocks
    new Paragraph(),
    new Heading2(),
    new Heading3(),
    new ListItem(),
    new BulletList(),
    new OrderedList(),
    new Embed(),
    new Code(),
    // new Table(),
    new BlockQuote(),
    // marks
    new Strong(),
    new Emphasis(),
    new Underline(),
    new Strike(),
    new Link(),
    // utility
    new MoveDown(),
    new MoveUp(),
    new Trash(),
    // default
    new DefaultKeys(),
    new DefaultPlugins({
        placeholder: 'ここに本文を入力'
    })
];
//# sourceMappingURL=index.js.map