import * as React from 'react';

import {
  EditorState
} from 'draft-js';

import { Editor } from 'react-draft-wysiwyg';
import styled from 'styled-components';

interface IProps {
  editorState: EditorState;
  className: string;
  toolbarClassName: string;
  getInnerDraftEditorRef: (HTMLElement) => any;
  onEditorStateChange: (EditorState) => void;
}

class PanelContentEditor extends React.Component<IProps, any> {

  render() {
    const {toolbarClassName, className: wrapperClassName, editorState, onEditorStateChange } = this.props;
    return (
      <React.Fragment>
        <Editor
          wrapperClassName={wrapperClassName}
          editorRef={this.props.getInnerDraftEditorRef}
          editorState={editorState}
          toolbarClassName={toolbarClassName}
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
  toolbarHeight?: number;
}
export default styled<ExtraProps & IProps, any>(PanelContentEditor)`
  & .rdw-editor-main {
    background: black;
    border: dashed 1px;
    height:calc(100% - ${props => props.toolbarHeight || 122}px);
  }
  &.rdw-editor-wrapper{
    height: 350px;
  }
  & .rdw-dropdown-optionwrapper > li {
    color: violet;
  }
  & .public-DraftStyleDefault-block {
    margin: 0;
    line-height: 1;
  }
`;
