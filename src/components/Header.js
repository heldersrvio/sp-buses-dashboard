import React from 'react';
import PropTypes from 'prop-types';
import Filter from './Filter';

const Header = (props) => {
	return (
		<div id="header-bar">
			<h1>Ônibus São Paulo</h1>
			<div id="filter-container">
				<Filter filterMap={props.filterMap} />
			</div>
		</div>
	);
};

Header.propTypes = {
	filterMap: PropTypes.func,
};

export default Header;
