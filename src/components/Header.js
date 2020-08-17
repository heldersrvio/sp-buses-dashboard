import React from 'react';
import PropTypes from 'prop-types';
import Filter from './Filter';
import './styles/Header.css';

const Header = (props) => {
	return (
		<div id="header-bar">
			<h1>Ônibus SP</h1>
			<div id="filter-container">
				<Filter updateDashboard={props.updateDashboard} />
			</div>
		</div>
	);
};

Header.propTypes = {
	updateDashboard: PropTypes.func,
};

export default Header;
