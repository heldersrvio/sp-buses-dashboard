import React, { useEffect, useState, useRef, useCallback } from 'react';
import OlhoVivo from './OlhoVivo';
import Header from './components/Header';
import Footer from './components/Footer';
import LanesBox from './components/LanesBox';
import LinesBox from './components/LinesBox';
import Map from './components/Map';
import './styles/App.css';

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
	const [error, setError] = useState(false);

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
		try {
			olhoVivo.current.fetchEstimatedArrivalTimes(
				stopCode,
				updateEstimatedTimes
			);
		} catch (error) {
			setError(true);
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

		const update = async () => {
			for (let i = 0; i < 5; i++) {
				try {
					setLoading(true);
					await olhoVivo.current.fetchStopsInformation(setStops);
					await olhoVivo.current.fetchLanesInformation(setLanes);
					await olhoVivo.current.fetchVehiclesInformation(
						setVehicles,
						finishUpdate
					);
					break;
				} catch (error) {
					if (i === 4) {
						setLoading(false);
						setError(true);
					}
				}
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
			<Header updateDashboard={setDashboardOptions} />
			<div id="dashboard">
				{dashboardOptions.showLines || dashboardOptions.showLanes ? (
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
								lanes={lanes}
								fetchStopsForLane={
									olhoVivo.current !== null
										? olhoVivo.current.fetchStopsForLane
										: () => {}
								}
							/>
						) : null}
					</div>
				) : null}
				{dashboardOptions.showMap ? (
					<div id="right-section">
						<Map
							vehicles={vehicles}
							stops={stops}
							currentRoute={currentRoute}
							loadEstimatedTimes={loadEstimatedTimes}
						/>
					</div>
				) : null}
			</div>
			<Footer
				loading={loading}
				error={error}
				lastUpdateTime={stringifyUpdateInterval()}
			/>
		</div>
	);
};

export default App;
