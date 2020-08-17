import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './styles/LanesBox.css';

const LanesBox = (props) => {
	const [visibleStops, setVisibleStops] = useState([]);
	const [stopsForLanes, setStopsForLanes] = useState({});

	const updateStops = (laneCode, stops) => {
		setStopsForLanes((sFL) => {
			const newObj = { ...sFL };
			newObj[laneCode] = stops;
			return newObj;
		});
	};

	const laneList = props.lanes.map((lane, index) => {
		return (
			<li className="lane-li" key={index}>
				<span className="lane-name">
					{lane.laneName}{' '}
					<button
						className="show-stops"
						onClick={() =>
							setVisibleStops((vS) => {
								if (vS.includes(lane.laneCode)) {
									return vS.filter((c) => c !== lane.laneCode);
								} else {
									if (stopsForLanes[lane.laneCode] === undefined) {
										props.fetchStopsForLane(lane.laneCode, updateStops);
									}
									return vS.concat(lane.laneCode);
								}
							})
						}
					>
						{visibleStops.includes(lane.laneCode)
							? 'Ocultar paradas ▼'
							: 'Mostrar paradas ▶'}
					</button>
				</span>
				<ul
					className={
						visibleStops.includes(lane.laneCode)
							? 'lane-stops-ul visible'
							: 'lane-stops-ul'
					}
				>
					{stopsForLanes[lane.laneCode] !== undefined
						? stopsForLanes[lane.laneCode].map((stop, index) => (
								<li
									key={'stop' + index + stop.stopCode}
									onClick={props.updateMap(stop.stopCode)}
								>
									{stop.stopName}
								</li>
						  ))
						: null}
				</ul>
			</li>
		);
	});

	return (
		<div id="lanes-box-container">
			<h2 id="lanes-h2">Corredores</h2>
			<ul id="lanes-ul">{laneList}</ul>
		</div>
	);
};

LanesBox.propTypes = {
	lanes: PropTypes.arrayOf(
		PropTypes.exact({
			laneCode: PropTypes.number,
			laneName: PropTypes.string,
		})
	),
	updateMap: PropTypes.func,
	fetchStopsForLane: PropTypes.func,
};

export default LanesBox;
