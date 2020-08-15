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
	const [loading, setLoading] = useState(false);
	const [lastUpdate, setLastUpdate] = useState(new Date());
	const [currentTime, setCurrentTime] = useState(new Date());

	const olhoVivo = useRef(null);

	const finishUpdate = () => {
		if (loading) {
			setLoading(false);
			setLastUpdate(new Date());
		}
	};

	const stringifyUpdateInterval = () => {
		console.log(currentTime);
		console.log(lastUpdate);
		switch (
			Math.floor((currentTime.getTime() - lastUpdate.getTime()) / 60000)
		) {
			case 0:
				return 'menos de 1 minuto';
			case 1:
				return '1 minuto';
			case 2:
				return '2 minutos';
			case 3:
				return '3 minutos';
			case 4:
				return '4 minutos';
			default:
				return '5 minutos';
		}
	};

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentTime(new Date());
		}, 1000);

		return () => {
			clearInterval(interval);
		};
	}, []);

	useEffect(() => {
		olhoVivo.current = OlhoVivo();

		const update = () => {
			if (olhoVivo.current.authenticate) {
				setLoading(true);
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
					<Map vehicles={vehicles} stops={stops} finishLoading={finishUpdate} />
				</div>
			</div>
			<Footer loading={loading} lastUpdateTime={stringifyUpdateInterval()} />
		</div>
	);
};

export default App;
