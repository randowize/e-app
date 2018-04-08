import { EditorState } from 'draft-js';

export interface IStateGetter {
  (): EditorState;
}
export interface IStateCommitter {
  (state: EditorState): any;
}

export interface IAction {
  (sg: IStateGetter, sc: IStateCommitter) : any;
};