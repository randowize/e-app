import * as React from 'react';
import {debounce} from 'lodash';
import {SketchPicker, ChromePicker} from 'react-color';
// import styled from 'styled-components';
import {selectProps} from '../../../utils/props-selector';
//const Container : any = styled.div``;

export interface IProps {
  [key: string]: any;
}

const ColorPicker : React.StatelessComponent < IProps > = (props) => (
    <ChromePicker
      disableAlpha={false}
      color={props.color}
      onChange={debounce(props.setColor, 100)}
    />
);


const propsNames = [
  'color',
  'setColor'
];

export default selectProps('ledStore')(...propsNames)(ColorPicker);
