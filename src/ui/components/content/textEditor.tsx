import * as React from 'react';
import { selectProps } from '../../../utils/props-selector';
import styled from 'styled-components';
import registerListener from '../../../shared/streams/process-text';
//import RTE from '../rich-text-editor/rdwysiwyg';

export interface TextEditorProps {
  [key: string]: any;
}

const Container : any = styled.textarea `
  background: #000;
  height: 75%;
  width : 75%;
  color:${(props: any) => props.color}
`;

class TextEditor extends React.Component<TextEditorProps, any> {
  node: HTMLTextAreaElement |null ;
  componentDidMount() {
    if (this.node) {
        registerListener(this.node)
        .do(this.props.setText)
        .subscribe(f => f, console.error);
    }

  }
  render() {
  return (
    <Container
      color={this.props.color}
      innerRef={node => this.node = node}
    />
    /*<RTE  onChange={console.log}/>*/
  );
}
}

const propsNames = ['text', 'setText', 'color'];

export default selectProps('ledStore')(...propsNames)(TextEditor);