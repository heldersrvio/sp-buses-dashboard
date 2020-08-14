import React, { useEffect, useState, useRef } from 'react';
import OlhoVivo from './OlhoVivo';
import Header from './components/Header';
import Footer from './components/Footer';
import LanesBox from './components/LanesBox';
import LinesBox from './components/LinesBox';
import Map from './components/Map';

const App = () => {
	const [vehicles, setVehicles] = useState([]);
	const [stops, setStops] = useState([]);
	const [lanes, setLanes] = useState([]);

	const makeAsync = (func) => {
		return (value) => {
			setTimeout(() => {
				func(value);
			}, 50);
		};
	};

	const olhoVivo = useRef(null);

	useEffect(() => {
		olhoVivo.current = OlhoVivo();

		const update = () => {
			if (olhoVivo.current.authenticate) {
				olhoVivo.current.fetchVehiclesInformation(makeAsync(setVehicles));
				olhoVivo.current.fetchStopsInformation(makeAsync(setStops));
				olhoVivo.current.fetchLanesInformation(makeAsync(setLanes));
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
			<div id="header-container">
				<Header filterMap={() => {}} />
			</div>
			<div id="dashboard">
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
				<div id="right-section">
					<Map vehicles={vehicles} stops={stops} />
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default App;
