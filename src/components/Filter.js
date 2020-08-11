import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const Filter = (props) => {
	const [showVehicles, setShowVehicles] = useState(true);
	const [showLines, setShowLines] = useState(true);
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
			showLines,
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
						for="filter-vehicle"
						className={showVehicles ? 'active' : 'inactive'}
					>
						Exibir veículos
					</label>
					<input
						type="checkbox"
						checked={showVehicles}
						onClick={() => toggleFilter(showVehicles, setShowVehicles)}
					></input>
				</li>
				<li className={'filter-option'}>
					<label
						for="filter-line"
						className={showLines ? 'active' : 'inactive'}
					>
						Exibir linhas
					</label>
					<input
						type="checkbox"
						checked={showLines}
						onClick={() => toggleFilter(showLines, setShowLines)}
					></input>
				</li>
				<li className={'filter-option'}>
					<label
						for="filter-stop"
						className={showStops ? 'active' : 'inactive'}
					>
						Exibir paradas
					</label>
					<input
						type="checkbox"
						checked={showStops}
						onClick={() => toggleFilter(showStops, setShowStops)}
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
