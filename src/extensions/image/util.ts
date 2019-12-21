import { findChildren } from 'prosemirror-utils'
import { EditorState } from 'prosemirror-state'
import { Transform } from 'prosemirror-transform'

export const deleteSelectionAtPos = (
  state: EditorState,
  pos,
  dispatch
): Transform => {
  const resolvedPos = state.doc.resolve(pos) as any;
  const rowNumber = resolvedPos.path[1];
  let i = 0;
  const [firstNode] = findChildren(
    state.doc,
    () => {
      if (rowNumber === i) {
        i++
        return true
      }
      i++
      return false
    },
    false
  );
  const firstIndex = firstNode.pos;
  const removeTransaction = state.tr.delete(
    firstIndex,
    firstIndex + firstNode.node.content.size + 2
  );
  return removeTransaction;
}

export const getNodeIndexFromPos = (doc: EditorState['doc'], pos: number) => {
  const resolvedPos = doc.resolve(pos) as any;
  const rowNumber = resolvedPos.path[1];
  return rowNumber;
}

export const getPosFromIndex = (doc: EditorState['doc'], index: number) => {
  let i = 0;
  const [findNode] = findChildren(
    doc,
    () => {
      if (index === i) {
        i++
        return true
      }
      i++
      return false
    },
    false
  );
  return findNode.pos;
}

export const hasClass = (el: HTMLElement, className: string) => {
  if (el.classList) {
    return el.classList.contains(className);
  } else {
    return new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className);
  }
}

export const readFiles = (files: FileList) => {
  const promiseArr = [];
  [].forEach.call(files, ((f: File) => {
    const promise = new Promise((resolve) => {
      const objFileReader = new FileReader();
      if (f.type.match('image.*')) {
        objFileReader.onload = () => {
          resolve({
            file: f,
            filetype: 'image',
            preview: objFileReader.result
          });
        };
        objFileReader.readAsDataURL(f);
      } else {
        objFileReader.onload = () => {
          resolve({
            file: f,
            filetype: 'file'
          });
        };
        objFileReader.readAsDataURL(f);
      }
      objFileReader.onerror = () => {
        resolve(null);
      };
    });
    promiseArr.push(promise);
  }));
  return Promise.all(promiseArr);
};