import * as React from 'react';
import * as Fa from 'react-fontawesome';
import {selectProps} from '../../../utils/props-selector';
import {Ul, Li} from './menu-styles';

export interface IProps {
    [key: string] : any;
    menuItems: any[];
}

const Menu: React.StatelessComponent < IProps > = (props) => (
    <Ul>
        {props
            .menuItems
            .map(item => (
                <Li
                    className={props.activeItem === item.id
                    ? 'active'
                    : ''}
                    onClick={() => props.onMenuItemClick(item)}
                    key={item.id}>
                    <Fa name={item.name}/>
                </Li>
            ))
}
    </Ul>
);

Menu.defaultProps = {
    menuItems: []
};

const props = ['menuItems', 'onMenuItemClick', 'activeItem'];

export default selectProps('menuStore')(...props)(Menu);
