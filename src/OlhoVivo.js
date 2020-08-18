const OlhoVivo = () => {
	const baseURL = process.env.REACT_APP_BASE_URL2;

	(async () => {
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
		if (responseData === true) {
			return true;
		}
		return false;
	})();

	const fetchVehiclesInformation = async (setVehicles, finishLoading) => {
		const response = await fetch(baseURL + 'Posicao', {
			method: 'GET',
			mode: 'cors',
		});
		const responseData = await response.json();
		if (response.status !== 200 || responseData === null) {
			throw new Error('Error');
		}
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
			finishLoading();
		}, 50);
	};

	const fetchStopsInformation = async (setStops) => {
		const response = await fetch(baseURL + 'Parada/Buscar?termosBusca=', {
			method: 'GET',
			mode: 'cors',
		});
		const responseData = await response.json();
		if (response.status !== 200 || responseData === null) {
			throw new Error('Error');
		}
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
	};

	const fetchLinesInformation = async (queryTerm, setLines) => {
		const response = await fetch(
			baseURL + `Linha/Buscar?termosBusca=${queryTerm}`,
			{
				method: 'GET',
				mode: 'cors',
			}
		);
		const responseData = await response.json();
		if (response.status !== 200 || responseData === null) {
			throw new Error('Error');
		}
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
	};

	const fetchLanesInformation = async (setLanes) => {
		const response = await fetch(baseURL + 'Corredor', {
			method: 'GET',
			mode: 'cors',
		});
		const responseData = await response.json();
		if (response.status !== 200 || responseData === null) {
			throw new Error('Error');
		}
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
	};

	const fetchStopsForLane = async (laneCode, setStopsForLane) => {
		const response = await fetch(
			baseURL + `Parada/BuscarParadasPorCorredor?codigoCorredor=${laneCode}`,
			{
				method: 'GET',
				mode: 'cors',
			}
		);
		const responseData = await response.json();
		if (response.status !== 200 || responseData === null) {
			throw new Error('Error');
		}
		let currentStops = [];
		responseData.forEach((stop) => {
			currentStops.push({
				stopName: stop.np,
				stopAddress: stop.ed,
			});
		});
		setStopsForLane(laneCode, currentStops);
	};

	const fetchEstimatedArrivalTimes = async (stopCode, update) => {
		const response = await fetch(
			baseURL + `Previsao/Parada?codigoParada=${stopCode}`,
			{
				method: 'GET',
				mode: 'cors',
			}
		);
		const responseData = await response.json();
		if (response.status !== 200 || responseData === null) {
			throw new Error('Error');
		}
		let currentEstimations = [];
		const stopCoordinates = [responseData.p.py, responseData.p.px];
		responseData.p.l.forEach((line) => {
			line.vs.forEach((vehicle) => {
				currentEstimations.push({
					prefix: vehicle.p,
					time: vehicle.t,
					vehicleCoordinates: [vehicle.py, vehicle.px],
					stopCoordinates,
				});
			});
		});
		update(stopCode, currentEstimations);
	};

	return {
		fetchVehiclesInformation,
		fetchStopsInformation,
		fetchLanesInformation,
		fetchLinesInformation,
		fetchStopsForLane,
		fetchEstimatedArrivalTimes,
	};
};

export default OlhoVivo;
