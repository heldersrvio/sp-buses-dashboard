import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Map from './components/Map';

const App = () => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [vehicles, setVehicles] = useState([]);
	const [lines, setLines] = useState([]);
	const [stops, setStops] = useState([]);

	useEffect(() => {
		const authenticate = async () => {
			try {
				const response = await fetch(
					process.env.REACT_APP_BASE_URL +
						`Login/Autenticar?token=${process.env.REACT_APP_SPTRANS_API_KEY}`,
					{
						method: 'POST',
						mode: 'cors',
					}
				);
				const responseData = await response.json();
				console.log(responseData);
				setIsAuthenticated(responseData);
			} catch (error) {
				console.log('Problem authenticating');
				return false;
			}
		};
		if (!isAuthenticated) {
			authenticate();
		}
	});

	useEffect(() => {
		if (isAuthenticated) {
			fetchVehiclesAndLinesInformation();
			fetchStopsInformation();
		}
	});

	const fetchVehiclesAndLinesInformation = async () => {
		try {
			if (vehicles.length === 0) {
				const response = await fetch(
					process.env.REACT_APP_BASE_URL + 'Posicao',
					{
						method: 'GET',
						mode: 'cors',
					}
				);
				const responseData = await response.json();
				let currentVehicles = [];
				let currentLines = [];
				responseData.l.forEach((line) => {
					currentLines.push({
						lineCode: line.cl,
						circular: line.lc,
						sign1: line.lt,
						sign2: line.tl,
						orientation: line.sl,
						descriptionSignMain: line.tp,
						descriptionSignSecondary: line.ts,
					});
					line.vs.forEach((vehicle) => {
						currentVehicles.push({
							prefix: vehicle.p,
							accessibility: vehicle.a,
							latitude: vehicle.py,
							longitude: vehicle.px,
							lineCode: line.cl,
						});
					});
				});
				setLines(currentLines);
				setVehicles(currentVehicles);
			}
		} catch (error) {
			console.log('Problem fetching vehicles and lines information');
		}
	};

	const fetchStopsInformation = async () => {
		try {
			if (stops.length === 0) {
				const response = await fetch(
					process.env.REACT_APP_BASE_URL + 'Parada/Buscar?termosBusca=',
					{
						method: 'GET',
						mode: 'cors',
					}
				);
				const responseData = await response.json();
				let currentStops = [];
				responseData.forEach((stop) => {
					currentStops.push({
						stopCode: stop.cp,
						stopName: stop.np,
						stopAddress: stop.ed,
						latitude: stop.py,
						longitude: stop.px,
					});
				});
				setStops(currentStops);
			}
		} catch (error) {
			console.log('Problem fetching stops information');
		}
	};

	return (
		<div className="App">
			<Header
				updateMap={() => {}}
				queryInformation={() => {}}
				filterMap={() => {}}
			/>
			<Map vehicles={vehicles} lines={lines} stops={stops} />
			<Footer />
		</div>
	);
};

export default App;
