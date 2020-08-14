import React, { useEffect, useState, useRef } from 'react';
import OlhoVivo from './OlhoVivo';
import Footer from './components/Footer';
import LanesBox from './components/LanesBox';
import Map from './components/Map';

const App = () => {
	const [vehicles, setVehicles] = useState([]);
	const [stops, setStops] = useState([]);
	const [lines, setLines] = useState([]);
	const [lanes, setLanes] = useState([]);

	const olhoVivo = useRef(null);

	useEffect(() => {
		const addNewLineGroup = (lineGroup) => {
			setLines(() => lines.concat(lineGroup));
		};
		const addNewStopGroup = (stopGroup) => {
			setStops(() => stops.concat(stopGroup));
		};
		const addNewVehicleGroup = (vehicleGroup) => {
			setVehicles(() => vehicles.concat(vehicleGroup));
		};
		const addNewLaneGroup = (laneGroup) => {
			setLanes(() => lanes.concat(laneGroup));
		};

		olhoVivo.current = OlhoVivo();

		const update = () => {
			if (olhoVivo.current.authenticate) {
				olhoVivo.current.fetchVehiclesAndLinesInformation(
					addNewLineGroup,
					addNewVehicleGroup
				);
				olhoVivo.current.fetchStopsInformation(addNewStopGroup);
				olhoVivo.current.fetchLanesInformation(addNewLaneGroup);
			}
		};

		const interval = setInterval(() => {
			update();
		}, 300000);

		update();

		return () => {
			clearInterval(interval);
		};
	}, []);

	return (
		<div className="App">
			<div id="left-section">
				<LanesBox updateMap={() => {}} lanes={lanes} />
			</div>
			<Map vehicles={vehicles} stops={stops} />
			<Footer />
		</div>
	);
};

export default App;
