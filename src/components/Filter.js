import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const Filter = (props) => {
	const [showMap, setShowMap] = useState(true);
	const [showLines, setShowLines] = useState(true);
	const [showLanes, setShowLanes] = useState(true);
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
	}, []);

	useEffect(() => {
		const updateDashboard = props.updateDashboard;
		updateDashboard({
			showLines,
			showLanes,
			showMap,
		});
	}, [showLines, showLanes, showMap, props.updateDashboard]);

	const toggleFilter = (filter, setFilter) => {
		setFilter(!filter);
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
						htmlFor="filter-lines"
						className={showLines ? 'active' : 'inactive'}
					>
						Exibir linhas
					</label>
					<input
						id="filter-lines"
						type="checkbox"
						checked={showLines}
						onChange={() => toggleFilter(showLines, setShowLines)}
					></input>
				</li>
				<li className={'filter-option'}>
					<label
						htmlFor="filter-lanes"
						className={showLanes ? 'active' : 'inactive'}
					>
						Exibir corredores
					</label>
					<input
						id="filter-lanes"
						type="checkbox"
						checked={showLanes}
						onChange={() => toggleFilter(showLanes, setShowLanes)}
					></input>
				</li>
				<li className={'filter-option'}>
					<label
						htmlFor="filter-map"
						className={showMap ? 'active' : 'inactive'}
					>
						Exibir mapa
					</label>
					<input
						id="filter-map"
						type="checkbox"
						checked={showMap}
						onChange={() => toggleFilter(showMap, setShowMap)}
					></input>
				</li>
			</ul>
		</div>
	);
};

Filter.propTypes = {
	updateDashboard: PropTypes.func,
};

export default Filter;
