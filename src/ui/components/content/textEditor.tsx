import * as React from 'react';
import { selectProps } from '../../../utils/props-selector';
// import styled from 'styled-components';
import registerListener from '../../listeners/text-change';

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
        registerListener(this.node);
        //.subscribe(this.props.setText, console.error);
    }

  }
  render() {
   console.log('called ...');
  return (
    <textarea
      style={{background: '#000', color: this.props.color}}
      ref={node => this.node = node}
      value = {this.props.text}
      onChange= {e => this.props.setText(e.target.value)}
    />
  );
}
}

const propsNames = ['text', 'setText', 'color'];

export default selectProps('ledStore')(...propsNames)(TextEditor);