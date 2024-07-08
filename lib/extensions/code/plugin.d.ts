import { Plugin } from 'prosemirror-state';
import { DecorationSet } from 'prosemirror-view';
export default function HighlightPlugin({ name }: {
    name: any;
}): Plugin<DecorationSet, any>;
