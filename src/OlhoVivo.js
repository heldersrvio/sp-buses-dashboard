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

	const fetchVehiclesAndLinesInformation = async (setLines, setVehicles) => {
		try {
			const response = await fetch(baseURL + 'Posicao', {
				method: 'GET',
				mode: 'cors',
			});
			const responseData = await response.json();
			let currentVehicles = [];
			let currentLines = [];
			setTimeout(() => {
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
						if (currentVehicles.length >= 100) {
							setVehicles(currentVehicles);
							currentVehicles = [];
						}
					});
					if (currentLines.length >= 100) {
						setLines(currentLines);
						currentLines = [];
					}
				});
				setLines(currentLines);
				setVehicles(currentVehicles);
			}, 50);
		} catch (error) {
			console.log('Problem fetching vehicles and lines information');
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
					if (currentStops.length >= 100) {
						setStops(currentStops);
						currentStops = [];
					}
				});
				setStops(currentStops);
			}, 50);
		} catch (error) {
			console.log('Problem fetching stops information');
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
				responseData.forEach(async (lane) => {
					const laneStopsResponse = await fetch(
						baseURL +
							`Parada/BuscarParadasPorCorredor?codigoCorredor=${lane.cc}`,
						{
							method: 'GET',
							mode: 'cors',
						}
					);
					const laneStopsResponseData = await laneStopsResponse.json();
					currentLanes.push({
						laneCode: lane.cc,
						laneName: lane.nc,
						laneStops: laneStopsResponseData.map((stop) => {
							return {
								stopCode: stop.cp,
								stopName: stop.np,
							};
						}),
					});
					setLanes(currentLanes);
				});
			}, 50);
		} catch (error) {
			console.log('Problem fetching lanes information');
		}
	};

	return {
		authenticate,
		fetchVehiclesAndLinesInformation,
		fetchStopsInformation,
		fetchLanesInformation,
	};
};

export default OlhoVivo;
