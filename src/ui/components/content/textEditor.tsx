import * as React from 'react';
import { selectProps } from '../../../utils/props-selector';
import styled from 'styled-components';

export interface TextEditorProps {
  [key : string] : any;
}


const Container = styled.textarea `
  background: #000;
  color:${(props: any) => props.style.color}
`;

function TextEditor(props : TextEditorProps) {
  return (
    <Container
      value={props.text}
      style={{color: props.color}}
      onChange={e => {props.setText(e.target['value']); }}
    />
  );
}

const propsNames = ['text', 'setText', 'color'];

export default selectProps('ledStore')(...propsNames)(TextEditor);