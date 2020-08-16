import React, { useEffect, useState, useRef, useCallback } from 'react';
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
	const [currentRoute, setCurrentRoute] = useState([]);
	const [dashboardOptions, setDashboardOptions] = useState({
		showLines: true,
		showLanes: true,
		showMap: true,
	});

	const olhoVivo = useRef(null);

	const updateEstimatedTimes = (stopCode, list) => {
		const estimatedTimesDiv = document.getElementById(
			`estimations-${stopCode}`
		);
		estimatedTimesDiv.textContent = '';
		if (estimatedTimesDiv !== null) {
			list.forEach((estimation) => {
				const li = document.createElement('li');
				li.textContent = `Previsão para veículo ${estimation.prefix}: ${estimation.time}`;
				li.onclick = () => {
					setCurrentRoute([
						estimation.vehicleCoordinates,
						estimation.stopCoordinates,
					]);
				};
				estimatedTimesDiv.appendChild(li);
			});
		}
	};

	const loadEstimatedTimes = useCallback((stopCode) => {
		if (olhoVivo.current.authenticate) {
			olhoVivo.current.fetchEstimatedArrivalTimes(
				stopCode,
				updateEstimatedTimes
			);
		}
	}, []);

	const stringifyUpdateInterval = () => {
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
			default:
				return '4 minutos';
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

		const finishUpdate = () => {
			setLoading(false);
			setLastUpdate(new Date());
			setCurrentTime(new Date());
		};

		const update = () => {
			if (olhoVivo.current.authenticate) {
				setLoading(true);
				olhoVivo.current.fetchVehiclesInformation(setVehicles, finishUpdate);
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
				<Header updateDashboard={setDashboardOptions} />
			</div>
			<div id="dashboard">
				<div id="left-section">
					{dashboardOptions.showLines ? (
						<LinesBox
							fetchLinesInformation={
								olhoVivo.current !== null
									? olhoVivo.current.fetchLinesInformation
									: () => {}
							}
						/>
					) : null}
					{dashboardOptions.showLanes ? (
						<LanesBox
							updateMap={() => {}}
							lanes={lanes}
							fetchStopsForLane={
								olhoVivo.current !== null
									? olhoVivo.current.fetchStopsForLane
									: () => {}
							}
						/>
					) : null}
				</div>
				<div id="right-section">
					{dashboardOptions.showMap ? (
						<Map
							vehicles={vehicles}
							stops={stops}
							currentRoute={currentRoute}
							loadEstimatedTimes={loadEstimatedTimes}
						/>
					) : (
						true
					)}
				</div>
			</div>
			<Footer loading={loading} lastUpdateTime={stringifyUpdateInterval()} />
		</div>
	);
};

export default App;
