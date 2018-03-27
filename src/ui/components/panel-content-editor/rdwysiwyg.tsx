import * as React from 'react';

import {
  EditorState
} from 'draft-js';

import { Editor } from 'react-draft-wysiwyg';
import styled from 'styled-components';

interface IProps {
  editorState: EditorState;
  className: string;
  getInnerDraftEditorRef: (HTMLElement) => any;
  onEditorStateChange: (EditorState) => void;
}

class PanelContentEditor extends React.Component<IProps, any> {

  render() {
    const { className, editorState, onEditorStateChange } = this.props;
    return (
      <React.Fragment>
        <Editor
          wrapperClassName={className}
          editorRef={this.props.getInnerDraftEditorRef}
          editorState={editorState}
          onEditorStateChange={onEditorStateChange}
          toolbar={{
            list: { inDropdown: true },
            link: { inDropdown: true }
          }}
        />
      </React.Fragment>
    );
  }
}

interface ExtraProps {
  height: number;
}
export default styled<ExtraProps & IProps, any>(PanelContentEditor)`
  height: ${props => props.height | 250}px;
  & .rdw-editor-main {
    background: black;
    border: dashed 1px;
  }
  & .rdw-dropdown-optionwrapper > li {
    color: violet;
  }
  & .public-DraftStyleDefault-block {
    margin: 0;
    line-height: 1;
  }
`;
