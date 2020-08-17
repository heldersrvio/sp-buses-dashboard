import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import './styles/Filter.css';

const Filter = (props) => {
	const [showMap, setShowMap] = useState(true);
	const [showLines, setShowLines] = useState(true);
	const [showLanes, setShowLanes] = useState(true);
	const [buttonClicked, setButtonClicked] = useState(false);
	const filterRef = useRef(null);

	useEffect(() => {
		document.addEventListener('click', (event) => {
			if (
				filterRef.current !== null &&
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
		<div id="filter" ref={filterRef}>
			<button
				id="filter-button"
				className={buttonClicked ? 'selected' : ''}
				onClick={() => setButtonClicked(!buttonClicked)}
			></button>
			<ul
				id="filter-drop-down"
				className={buttonClicked ? 'visible' : 'hidden'}
			>
				<li className={'filter-option'}>
					<input
						id="filter-lines"
						type="checkbox"
						checked={showLines}
						onChange={() => toggleFilter(showLines, setShowLines)}
					></input>
					<label
						htmlFor="filter-lines"
						className={showLines ? 'active' : 'inactive'}
					>
						Exibir linhas
					</label>
				</li>
				<li className={'filter-option'}>
					<input
						id="filter-lanes"
						type="checkbox"
						checked={showLanes}
						onChange={() => toggleFilter(showLanes, setShowLanes)}
					></input>
					<label
						htmlFor="filter-lanes"
						className={showLanes ? 'active' : 'inactive'}
					>
						Exibir corredores
					</label>
				</li>
				<li className={'filter-option'}>
					<input
						id="filter-map"
						type="checkbox"
						checked={showMap}
						onChange={() => toggleFilter(showMap, setShowMap)}
					></input>
					<label
						htmlFor="filter-map"
						className={showMap ? 'active' : 'inactive'}
					>
						Exibir mapa
					</label>
				</li>
			</ul>
		</div>
	);
};

Filter.propTypes = {
	updateDashboard: PropTypes.func,
};

export default Filter;
