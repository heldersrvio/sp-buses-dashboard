import React, { useEffect, useState, useRef } from 'react';
import OlhoVivo from './OlhoVivo';
import Footer from './components/Footer';
import LanesBox from './components/LanesBox';
import LinesBox from './components/LinesBox';
import Map from './components/Map';

const App = () => {
	const [vehicles, setVehicles] = useState([]);
	const [stops, setStops] = useState([]);
	const [lanes, setLanes] = useState([]);

	const olhoVivo = useRef(null);

	useEffect(() => {
		olhoVivo.current = OlhoVivo();

		const update = () => {
			if (olhoVivo.current.authenticate) {
				olhoVivo.current.fetchVehiclesInformation(setVehicles);
				olhoVivo.current.fetchStopsInformation(setStops);
				olhoVivo.current.fetchLanesInformation(setLanes);
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
				<LinesBox
					fetchLinesInformation={
						olhoVivo.current !== null
							? olhoVivo.current.fetchLinesInformation
							: () => {}
					}
				/>
				<LanesBox
					updateMap={() => {}}
					lanes={lanes}
					fetchStopsForLane={
						olhoVivo.current !== null
							? olhoVivo.current.fetchStopsForLane
							: () => {}
					}
				/>
			</div>
			<Map vehicles={vehicles} stops={stops} />
			<Footer />
		</div>
	);
};

export default App;
