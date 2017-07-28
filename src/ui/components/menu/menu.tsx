import * as React from 'react';
import * as Fa from 'react-fontawesome';
import {Ul, Li} from './menu-styles';
import {selectProps} from '../../../utils/props-selector';
import * as path from 'path';

const logoUrl = path.resolve(__dirname, 'logo-1.png');

export interface IProps {
    [key: string]: any;
    menuItems?: any[];
}

export const Menu: React.StatelessComponent<IProps> = (props) => (
    <Ul>
        <Li key='-1'>
            <img src={logoUrl} style={{borderRadius: '50%'}}/>
        </Li>
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