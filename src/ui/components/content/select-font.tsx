import * as React from 'react';
import { selectProps } from '../../../utils/props-selector';
import styled from 'styled-components';

const Select = require('react-select');
const SelectStyled: any = styled(Select)`
    height:35px;
    width: 100%;
`;

export interface IProps {
 [key: string]: any;
}

const SelectFont : React.StatelessComponent<IProps> = (props) => (
    <SelectStyled
        options={props.options}
        onChange={props.setFont}
        value={props.activeFont}
    />
);

SelectFont.defaultProps = {};

const propsNames = [{fontOptions: 'options'}, 'activeFont', 'setFont'];

export default selectProps('ledStore')(...propsNames)(SelectFont);
