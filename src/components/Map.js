import React, { useEffect, useRef } from 'react';
import SearchBar from './SearchBar';
import PropTypes from 'prop-types';
import L from 'leaflet';

const Map = (props) => {
	const map = useRef(null);

	const focusOnMarker = (code) => {
		if (map !== null && map.current !== undefined) {
			const stopsWithCode = props.stops.filter(
				(stop) => stop.stopCode === code
			);
			if (stopsWithCode.length > 0) {
				map.current.setView(
					[stopsWithCode[0].latitude, stopsWithCode[0].longitude],
					17
				);
				map.current.eachLayer((layer) => {
					if (
						layer.getLatLng !== undefined &&
						layer
							.getLatLng()
							.equals([stopsWithCode[0].latitude, stopsWithCode[0].longitude])
					) {
						layer.openPopup();
						return;
					}
				});
				return;
			}
			const vehiclesWithCode = props.vehicles.filter(
				(vehicle) => vehicle.vehicleCode === code
			);
			if (vehiclesWithCode.length > 0) {
				map.current.setView(
					[vehiclesWithCode[0].latitude, vehiclesWithCode[0].longitude],
					17
				);
			}
		}
		return;
	};

	const queryInformation = (searchTerm) => {
		let items = [];
		const term = searchTerm.toUpperCase();
		if (term === '') {
			return items;
		}
		for (let i = 0; i < props.stops.length; i++) {
			if (
				props.stops[i].stopCode.toString().includes(term) ||
				props.stops[i].stopName.toString().includes(term)
			) {
				items.push({
					title: props.stops[i].stopCode,
					type: 'parada',
					info: props.stops[i].stopName,
				});
				if (items.length === 5) {
					return items;
				}
			}
		}
		for (let i = 0; i < props.vehicles.length; i++) {
			if (props.vehicles[i].prefix.toString().includes(term)) {
				items.push({
					title: props.vehicles[i].prefix,
					type: 'ônibus',
					info: '',
				});
				if (items.length === 5) {
					return items;
				}
			}
		}
		return items;
	};

	useEffect(() => {
		const darkTileLayer = L.tileLayer(
			'https://{s}.tile.jawg.io/jawg-matrix/{z}/{x}/{y}{r}.png?access-token={accessToken}',
			{
				attribution:
					'<a href="http://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank">&copy; <b>Jawg</b>Maps</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
				minZoom: 0,
				maxZoom: 22,
				subdomains: 'abcd',
				accessToken: process.env.REACT_APP_JAWG_API_KEY,
			}
		);
		const terrainTileLayer = L.tileLayer(
			'https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png',
			{
				maxZoom: 20,
				attribution:
					'&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
			}
		);
		const satelliteTileLayer = L.tileLayer(
			'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
			{
				attribution:
					'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
			}
		);
		const standardTileLayer = L.tileLayer(
			'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}',
			{
				attribution:
					'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
				maxZoom: 18,
				id: 'mapbox/streets-v11',
				tileSize: 512,
				zoomOffset: -1,
				accessToken: process.env.REACT_APP_MAPBOX_API_KEY,
			}
		);

		const loadEstimatedTimes = props.loadEstimatedTimes;

		const vehicleMarkers = L.layerGroup(
			props.vehicles.map((vehicle) => {
				const marker = L.marker([vehicle.latitude, vehicle.longitude]);
				marker.bindPopup(
					`<b>Ônibus ${vehicle.prefix}</b><br>Linha ${vehicle.lineCode}<br>${
						vehicle.accessibility
							? 'Acessível para pessoas com deficiência'
							: 'Não acessível para pessoas com deficiência'
					}`
				);
				return marker;
			})
		);

		const stopMarkers = L.layerGroup(
			props.stops.map((stop) => {
				const marker = L.marker([stop.latitude, stop.longitude]);
				marker.setOpacity(0.5);
				marker.bindPopup(
					`<b>Parada ${stop.stopName}</b><br>Endereço: ${stop.stopAddress}<br><button id="button-${stop.stopCode}" class="show-estimated-time-button">Mostrar previsões de chegada</button><ul id="estimations-${stop.stopCode}"></ul>`
				);
				marker.on('click', (e) => {
					document
						.getElementById(`button-${stop.stopCode}`)
						.addEventListener('click', (e) =>
							loadEstimatedTimes(stop.stopCode)
						);
				});
				return marker;
			})
		);

		const baseMaps = {
			Padrão: standardTileLayer,
			Escuro: darkTileLayer,
			Terreno: terrainTileLayer,
			Satélite: satelliteTileLayer,
		};

		const overlayMaps = {
			'Exibir veículos': vehicleMarkers,
			'Exibir paradas': stopMarkers,
		};

		if (map.current._container === undefined) {
			map.current = L.map('mapid', {
				layers: [standardTileLayer, vehicleMarkers, stopMarkers],
			}).setView([-23.542271, -46.636823], 17);
			L.control.layers(baseMaps, overlayMaps).addTo(map.current);
		} else {
			const center = map.current.getCenter();
			const zoom = map.current.getZoom();
			map.current.remove();
			map.current = L.map('mapid', {
				layers: [standardTileLayer, vehicleMarkers, stopMarkers],
			}).setView(center, zoom);
			L.control.layers(baseMaps, overlayMaps).addTo(map.current);
		}
	}, [props.vehicles, props.stops, props.loadEstimatedTimes]);

	return (
		<div id="map-container">
			<SearchBar
				updateMap={focusOnMarker}
				queryInformation={queryInformation}
			/>
			<div
				id="mapid"
				ref={map}
				style={{ height: '400px', width: '600px' }}
			></div>
		</div>
	);
};

Map.propTypes = {
	vehicles: PropTypes.arrayOf(
		PropTypes.exact({
			prefix: PropTypes.number,
			accessibility: PropTypes.bool,
			latitude: PropTypes.number,
			longitude: PropTypes.number,
			lineCode: PropTypes.number,
		})
	),
	stops: PropTypes.arrayOf(
		PropTypes.exact({
			stopCode: PropTypes.number,
			stopName: PropTypes.string,
			stopAddress: PropTypes.string,
			latitude: PropTypes.number,
			longitude: PropTypes.number,
		})
	),
	loadEstimatedTimes: PropTypes.func,
};

export default Map;
