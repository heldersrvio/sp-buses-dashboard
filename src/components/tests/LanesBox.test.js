import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import LanesBox from '../LanesBox';

configure({ adapter: new Adapter() });

test('Lanes displayed appropriately', () => {
	const lanesBox = mount(
		<LanesBox
			lanes={[
				{
					laneCode: 12,
					laneName: 'Lorem',
				},
				{
					laneCode: 10,
					laneName: 'Ipsum',
				},
			]}
			updateMap={() => {}}
			fetchStopsForLane={() => {}}
		/>
	);
	const title = <h2 id="lanes-h2">Corredores</h2>;
	expect(lanesBox.contains(title)).toEqual(true);
	expect(lanesBox.find('.lane-li').length).toEqual(2);
	expect(lanesBox.find('.lane-li').at(0).text()).toEqual(
		'Lorem Mostrar paradas ▶'
	);
	expect(lanesBox.find('.lane-li').at(1).text()).toEqual(
		'Ipsum Mostrar paradas ▶'
	);
});

test('Stops information displayed appropriately', () => {
	const lanes = [
		{
			laneCode: 12,
			laneName: 'Lorem',
		},
		{
			laneCode: 10,
			laneName: 'Ipsum',
		},
	];
	const fetchStopsForLane = (laneCode, callback) => {
		callback(laneCode, [
			{
				stopCode: 2,
				stopName: 'Dolor',
			},
		]);
	};
	const lanesBox = mount(
		<LanesBox
			lanes={lanes}
			updateMap={() => {}}
			fetchStopsForLane={fetchStopsForLane}
		/>
	);
	lanesBox.find('.show-stops').at(0).simulate('click');
	expect(lanesBox.find('.lane-li').at(0).text()).toEqual(
		'Lorem Ocultar paradas ▼Dolor'
	);
	expect(lanesBox.find('.lane-stops-ul').at(0).hasClass('visible')).toEqual(
		true
	);
	lanesBox.find('.show-stops').at(1).simulate('click');
	expect(lanesBox.find('.lane-li').at(1).text()).toEqual(
		'Ipsum Ocultar paradas ▼Dolor'
	);
	expect(lanesBox.find('.lane-stops-ul').at(1).hasClass('visible')).toEqual(
		true
	);
	lanesBox.find('.show-stops').at(0).simulate('click');
	expect(lanesBox.find('.lane-stops-ul').at(0).hasClass('visible')).toEqual(
		false
	);
});
