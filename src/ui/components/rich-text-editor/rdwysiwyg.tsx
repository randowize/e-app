import * as React from 'react';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';

export default class RWWG extends React.Component<any, any> {
  state = {
    editorState: EditorState.createEmpty()
  };

  onEditorStateChange = editorState => {
    this.setState({ editorState });
  }
  render() {
    return (
      <Editor
      editorState={this.state.editorState}
      onEditorStateChange={this.onEditorStateChange}/>
    );
  }
}
