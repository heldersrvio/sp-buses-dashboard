const OlhoVivo = () => {
	const baseURL = process.env.REACT_APP_BASE_URL2;

	const authenticate = (async () => {
		try {
			const response = await fetch(
				baseURL +
					`Login/Autenticar?token=${process.env.REACT_APP_SPTRANS_API_KEY}`,
				{
					method: 'POST',
					mode: 'cors',
				}
			);
			const responseData = await response.json();
			console.log(responseData);
			return responseData;
		} catch (error) {
			console.log('Problem authenticating');
			return false;
		}
	})();

	const fetchVehiclesInformation = async (setVehicles) => {
		try {
			const response = await fetch(baseURL + 'Posicao', {
				method: 'GET',
				mode: 'cors',
			});
			const responseData = await response.json();
			let currentVehicles = [];
			setTimeout(() => {
				responseData.l.forEach((line) => {
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
				setVehicles(currentVehicles);
			}, 50);
		} catch (error) {
			console.log('Problem fetching vehicles information');
		}
	};

	const fetchStopsInformation = async (setStops) => {
		try {
			const response = await fetch(baseURL + 'Parada/Buscar?termosBusca=', {
				method: 'GET',
				mode: 'cors',
			});
			const responseData = await response.json();
			let currentStops = [];
			setTimeout(() => {
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
			}, 50);
		} catch (error) {
			console.log('Problem fetching stops information');
		}
	};

	const fetchLinesInformation = async (queryTerm, setLines) => {
		try {
			const response = await fetch(
				baseURL + `Linha/Buscar?termosBusca=${queryTerm}`,
				{
					method: 'GET',
					mode: 'cors',
				}
			);
			const responseData = await response.json();
			let currentLines = [];
			setTimeout(() => {
				responseData.forEach((line) => {
					currentLines.push({
						lineCode: line.cl,
						circular: line.lc,
						lineNumericalSignOne: line.lt,
						lineNumericalSignTwo: line.tl,
						lineOrientation: line.sl,
						lineSignPrimary: line.tp,
						lineSignSecondary: line.ts,
					});
				});
				setLines(currentLines);
			}, 50);
		} catch (error) {
			console.log('Problem fetching lines information');
		}
	};

	const fetchLanesInformation = async (setLanes) => {
		try {
			const response = await fetch(baseURL + 'Corredor', {
				method: 'GET',
				mode: 'cors',
			});
			const responseData = await response.json();
			let currentLanes = [];
			setTimeout(() => {
				responseData.forEach((lane) => {
					currentLanes.push({
						laneCode: lane.cc,
						laneName: lane.nc,
					});
				});
				setLanes(currentLanes);
			}, 50);
		} catch (error) {
			console.log('Problem fetching lanes information');
		}
	};

	const fetchStopsForLane = async (laneCode, setStopsForLane) => {
		const laneStopsResponse = await fetch(
			baseURL + `Parada/BuscarParadasPorCorredor?codigoCorredor=${laneCode}`,
			{
				method: 'GET',
				mode: 'cors',
			}
		);
		const responseData = await laneStopsResponse.json();
		let currentStops = [];
		responseData.forEach((stop) => {
			currentStops.push({
				stopName: stop.np,
				stopAddress: stop.ed,
			});
		});
		setStopsForLane(laneCode, currentStops);
	};

	return {
		authenticate,
		fetchVehiclesInformation,
		fetchStopsInformation,
		fetchLanesInformation,
		fetchLinesInformation,
		fetchStopsForLane,
	};
};

export default OlhoVivo;
