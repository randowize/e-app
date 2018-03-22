import * as React from 'react';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import styled from 'styled-components';

import { convertDomNodeToImage } from '../dom-to-img/dom-to-img';

class PanelContentEditor extends React.Component<any, any> {
  state = {
    editorState: EditorState.createEmpty()
  };

  editorRef;
  onEditorStateChange = editorState => {
    this.setState({ editorState }, async () => {
      const src = await convertDomNodeToImage(this.editorRef.editorContainer);
      this.props.processImage(src);
    });
  };
  setEditorReference = ref => {
    this.editorRef = ref;
  };
  render() {
    const { className } = this.props;
    return (
      <Editor
        wrapperClassName={className}
        editorRef={this.setEditorReference}
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
  processImage: () => any;
}
export default styled<ExtraProps, any>(PanelContentEditor)`
  & .rdw-editor-main {
    background: black;
    border: dashed 1px;
  }
`;
