import React, { useState } from 'react';
import PropTypes from 'prop-types';

const LanesBox = (props) => {
	const [visibleStops, setVisibleStops] = useState([]);

	const laneList = props.lanes.map((lane) => {
		return (
			<li className="lane-li" key={lane.laneCode}>
				<span className="lane-name">
					{lane.laneName}{' '}
					<button
						className="show-stops"
						onClick={() => setVisibleStops(visibleStops.concat(lane.laneCode))}
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
					{lane.laneStops.map((stop) => (
						<li onClick={props.updateMap(stop.stopCode)} key={stop.stopCode}>
							{stop.stopName}
						</li>
					))}
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
			laneStops: PropTypes.arrayOf(
				PropTypes.exact({
					stopCode: PropTypes.number,
					stopName: PropTypes.string,
				})
			),
		})
	),
	updateMap: PropTypes.func,
};

export default LanesBox;
