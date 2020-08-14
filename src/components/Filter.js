import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const Filter = (props) => {
	const [showVehicles, setShowVehicles] = useState(true);
	const [showStops, setShowStops] = useState(true);
	const [buttonClicked, setButtonClicked] = useState(false);
	const filterRef = useRef(null);

	useEffect(() => {
		document.addEventListener('click', (event) => {
			if (
				filterRef !== null &&
				filterRef.current !== undefined &&
				!filterRef.current.contains(event.target)
			) {
				setButtonClicked(false);
			}
		});
	});

	const toggleFilter = (filter, setFilter) => {
		setFilter(!filter);
		props.filterMap({
			showVehicles,
			showStops,
		});
	};

	return (
		<div id="filter">
			<button
				id="filter-button"
				ref={filterRef}
				onClick={() => setButtonClicked(!buttonClicked)}
			></button>
			<ul
				id="filter-drop-down"
				className={buttonClicked ? 'visible' : 'hidden'}
			>
				<li className={'filter-option'}>
					<label
						htmlFor="filter-vehicle"
						className={showVehicles ? 'active' : 'inactive'}
					>
						Exibir veículos
					</label>
					<input
						type="checkbox"
						checked={showVehicles}
						onChange={() => toggleFilter(showVehicles, setShowVehicles)}
					></input>
				</li>
				<li className={'filter-option'}>
					<label
						htmlFor="filter-stop"
						className={showStops ? 'active' : 'inactive'}
					>
						Exibir paradas
					</label>
					<input
						type="checkbox"
						checked={showStops}
						onChange={() => toggleFilter(showStops, setShowStops)}
					></input>
				</li>
			</ul>
		</div>
	);
};

Filter.propTypes = {
	filterMap: PropTypes.func,
};

export default Filter;
