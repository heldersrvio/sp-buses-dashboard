import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import LinesBox from '../LinesBox';

configure({ adapter: new Adapter() });

test('No results with no input', () => {
	const linesBox = mount(<LinesBox fetchLinesInformation={(a, b) => {}} />);
	expect(linesBox.find('.lines-box-result').length).toEqual(0);
});

test('Appropriate results shown', () => {
	const fetchLines = (value, callback) => {
		callback([
			{
				lineCode: 1,
				lineSignPrimary: 'Lorem',
				lineSignSecondary: 'ipsum',
				circular: true,
				lineNumericalSignOne: 10,
				lineNumericalSignTwo: 12,
				lineOrientation: 1,
			},
		]);
	};
	const linesBox = mount(<LinesBox fetchLinesInformation={fetchLines} />);
	expect(linesBox.find('.lines-box-result').length).toEqual(0);
	linesBox
		.find('input')
		.simulate('change', { target: { value: 'lorem ipsum' } });
	expect(linesBox.find('.lines-box-result').length).toEqual(1);
	expect(linesBox.find('.lines-box-result-terminal').text()).toEqual(
		'Lorem ipsum ▶'
	);
	expect(linesBox.find('.lines-box-result-details').hasClass('hidden')).toEqual(
		true
	);
	linesBox.find('.lines-box-result-terminal').simulate('click');
	expect(linesBox.find('.lines-box-result-details').hasClass('hidden')).toEqual(
		false
	);
	expect(
		linesBox.find('.lines-box-result-details').hasClass('visible')
	).toEqual(true);
	const codeLi = (
		<li>
			<b>Código:</b> 1
		</li>
	);
	const circularLi = (
		<li>
			<b>Circular</b>
		</li>
	);
	const signLi = (
		<li>
			<b>Letreiro:</b> 10 12
		</li>
	);
	const numericalSignTwoLi = (
		<li>
			<b>Atendimento</b>
		</li>
	);
	const orientationLi = (
		<li>
			<b>Sentido:</b> Terminal principal para secundário
		</li>
	);
	expect(linesBox.contains(codeLi)).toEqual(true);
	expect(linesBox.contains(circularLi)).toEqual(true);
	expect(linesBox.contains(signLi)).toEqual(true);
	expect(linesBox.contains(numericalSignTwoLi)).toEqual(true);
	expect(linesBox.contains(orientationLi)).toEqual(true);
});
