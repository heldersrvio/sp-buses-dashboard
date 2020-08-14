import React from 'react';
import PropTypes from 'prop-types';
import Filter from './Filter';
import SearchBar from './SearchBar';

const MapSearchBar = (props) => {
	return (
		<div id="map-search-bar">
			<h1>Ônibus São Paulo</h1>
			<div id="bar">
				<SearchBar
					updateMap={props.updateMap}
					queryInformation={props.queryInformation}
				/>
				<Filter filterMap={props.filterMap} />
			</div>
		</div>
	);
};

MapSearchBar.propTypes = {
	updateMap: PropTypes.func,
	queryInformation: PropTypes.func,
	filterMap: PropTypes.func,
};

export default MapSearchBar;
