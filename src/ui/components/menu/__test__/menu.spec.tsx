import * as React from 'react';
import * as rtr  from 'react-test-renderer';
import {Menu} from '../menu';
it('renders correctly', () => {
  const output = rtr.create(<Menu menuItems={[{name: 'bus', id: '1'}]}/>).toJSON();
  expect(output).toMatchSnapshot();
});