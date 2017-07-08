import * as React from 'react';
import { selectProps } from '../../../utils/props-selector';
// import styled from 'styled-components';
import registerListener from '../../../shared/streams/text-change';

export interface TextEditorProps {
  [key: string]: any;
}
/*
const Container = styled.textarea `
  background: #000;
  color:${(props: any) => props.style.color}
`;
*/
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
    <textarea
      style={{background: '#000', color: this.props.color}}
      ref={node => this.node = node}
    />
  );
}
}

const propsNames = ['text', 'setText', 'color'];

export default selectProps('ledStore')(...propsNames)(TextEditor);