import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Filter from '../Filter';

configure({ adapter: new Adapter() });

test('Displays and hides drop down properly', () => {
	const updateDashboard = () => {};
	const filter = mount(<Filter updateDashboard={updateDashboard} />);
	expect(filter.find('#filter-button').hasClass('selected')).toEqual(false);
	expect(filter.find('#filter-drop-down').hasClass('hidden')).toEqual(true);
	filter.find('#filter-button').simulate('click');
	expect(filter.find('#filter-drop-down').hasClass('hidden')).toEqual(false);
	expect(filter.find('#filter-drop-down').hasClass('visible')).toEqual(true);
	expect(filter.find('#filter-button').hasClass('selected')).toEqual(true);
});

test('State changes properly', () => {
	let state = {};
	const updateDashboard = (object) => {
		state = object;
	};
	const filter = mount(<Filter updateDashboard={updateDashboard} />);
	const linesCheckbox = filter.find('#filter-lines');
	const lanesCheckbox = filter.find('#filter-lanes');
	const mapCheckbox = filter.find('#filter-map');
	expect(state.showLines).toEqual(true);
	expect(state.showLanes).toEqual(true);
	expect(state.showMap).toEqual(true);
	linesCheckbox.simulate('change');
	expect(state.showLines).toEqual(false);
	lanesCheckbox.simulate('change');
	expect(state.showLanes).toEqual(false);
	mapCheckbox.simulate('change');
	expect(state.showMap).toEqual(false);
});
