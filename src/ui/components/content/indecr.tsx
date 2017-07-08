import * as React from 'react';
import {selectProps} from '../../../utils/props-selector';
import styled from 'styled-components';

const Container: any = styled.div`
`;

export interface IProps {
  [key: string]: any;
}

const Indecr : React.StatelessComponent < IProps > = (props) => (
  <Container>
    <label>{props.label}</label>
    <button onClick={props.action(-1)}>
      -
    </button>
    <button onClick={props.action(+ 1)}>
      +
    </button>
  </Container>
);

Indecr.defaultProps = {};

const V = styled(Indecr)`
 backgroud:${(props) => props.ok ? '#ffeaee' : '#eefdae'}
`;
const propsNames = [
];

export default selectProps('ledStore')(...propsNames)(V);
