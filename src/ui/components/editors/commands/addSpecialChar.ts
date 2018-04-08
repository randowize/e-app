import { EditorState, Modifier } from 'draft-js';
import { IStateGetter, IStateCommitter } from './interfaces';

/* 0x20ba ₺ (Decimal code : 8378)*/
export const addChar = (charCode: number = 0x20ba) => (
  getState: IStateGetter,
  commitChange: IStateCommitter
) => {
  const editorState: EditorState = getState();
  const contentState = Modifier.replaceText(
    editorState.getCurrentContent(),
    editorState.getSelection(),
    String.fromCharCode(charCode),
    editorState.getCurrentInlineStyle()
  );
  const newState = EditorState.push(
    editorState,
    contentState,
    'insert-characters'
  );
  commitChange(newState);
};
