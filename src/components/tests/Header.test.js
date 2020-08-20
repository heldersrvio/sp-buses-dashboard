import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Header from '../Header';

configure({ adapter: new Adapter() });

test('Displays title correctly', () => {
	const header = mount(<Header updateDashboard={() => {}} />);
	const title = <h1>Ônibus SP</h1>;
	expect(header.contains(title)).toEqual(true);
});
