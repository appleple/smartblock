import { EditorState } from 'prosemirror-state';
import { Dispatch } from '../..';
export declare function toggleCell(cellType: 'th' | 'td'): (state: EditorState<any>, dispatch: Dispatch) => boolean;
