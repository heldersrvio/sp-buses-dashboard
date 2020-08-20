import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import SearchBar from '../SearchBar';

configure({ adapter: new Adapter() });

test('Displays no results message', () => {
	const searchBar = mount(
		<SearchBar updateMap={() => {}} queryInformation={(term) => []} />
	);
	expect(searchBar.find('#search-results').hasClass('visible')).toEqual(false);
	searchBar
		.find('input')
		.simulate('change', { target: { value: 'Lorem ipsum' } });
	expect(searchBar.find('#search-results').hasClass('visible')).toEqual(true);
	expect(searchBar.find('#search-results').text()).toEqual('Sem resultados');
});

test('Displays results appropriately', () => {
	const searchBar = mount(
		<SearchBar
			updateMap={() => {}}
			queryInformation={(term) => [
				{
					type: 'ônibus',
					title: '2195',
					info: '',
				},
				{
					type: 'ônibus',
					title: '2000',
					info: '',
				},
				{
					type: 'parada',
					title: 'Lorem ipsum',
					info: 'Dolor sit amet',
				},
			]}
		/>
	);
	searchBar
		.find('input')
		.simulate('change', { target: { value: 'Lorem ipsum' } });
	expect(searchBar.find('.search-result-card').length).toEqual(3);
	expect(
		searchBar.find('.search-results-card-right-section').at(0).text()
	).toEqual('ÔNIBUS 2195');
	expect(
		searchBar.find('.search-results-card-right-section').at(1).text()
	).toEqual('ÔNIBUS 2000');
	expect(
		searchBar.find('.search-results-card-right-section').at(2).text()
	).toEqual('PARADA Lorem ipsumDolor sit amet');
	expect(searchBar.find('img').at(0).prop('src')).toEqual(
		'https://image.flaticon.com/icons/png/512/171/171255.png'
	);
	expect(searchBar.find('img').at(1).prop('src')).toEqual(
		'https://image.flaticon.com/icons/png/512/171/171255.png'
	);
	expect(searchBar.find('img').at(2).prop('src')).toEqual(
		'http://icons.iconarchive.com/icons/google/noto-emoji-travel-places/1024/42561-bus-stop-icon.png'
	);
});
