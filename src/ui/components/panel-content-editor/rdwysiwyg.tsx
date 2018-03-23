import * as React from 'react';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import styled from 'styled-components';

class PanelContentEditor extends React.Component<any, any> {
  state = {
    editorState: EditorState.createEmpty()
  };

  onEditorStateChange = editorState => {
    this.setState({ editorState });
  };

  render() {
    const { className } = this.props;
    return (
      <Editor
        wrapperClassName={className}
        editorRef={this.props.getInnerDraftEditorRef}
        editorState={this.state.editorState}
        onEditorStateChange={this.onEditorStateChange}
        toolbar={{
          inline: { inDropdown: true },
          list: { inDropdown: true },
          textAlign: { inDropdown: true },
          link: { inDropdown: true },
          history: { inDropdown: true }
        }}
      />
    );
  }
}

interface ExtraProps {
  getInnerDraftEditorRef: (any) => any;
}
export default styled<ExtraProps, any>(PanelContentEditor)`
  & .rdw-editor-main {
    background: black;
    border: dashed 1px;
  }
`;
