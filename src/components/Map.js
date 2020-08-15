import React, { useEffect, useRef } from 'react';
import SearchBar from './SearchBar';
import PropTypes from 'prop-types';
import L from 'leaflet';

const Map = (props) => {
	const map = useRef(null);
	useEffect(() => {
		console.log('Updated again');
	}, [props.vehicles, props.stops]);

	useEffect(() => {
		if (map.current._container === undefined) {
			map.current = L.map('mapid').setView([-23.542271, -46.636823], 17);
		}
		L.tileLayer(
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
		).addTo(map.current);
	}, []);

	useEffect(() => {
		const callback = props.finishLoading;

		const vehicleMarkers = props.vehicles.map((vehicle) => {
			const marker = L.marker([vehicle.latitude, vehicle.longitude]);
			marker.bindPopup(
				`<b>Ônibus ${vehicle.prefix}</b><br>Linha ${vehicle.lineCode}<br>${
					vehicle.accessibility
						? 'Acessível para pessoas com deficiência'
						: 'Não acessível para pessoas com deficiência'
				}`
			);
			return marker;
		});

		const addVehiclesToMap = () => {
			console.log(vehicleMarkers.length);
			for (let i = 0; i < vehicleMarkers.length; i++) {
				setTimeout(() => {
					vehicleMarkers[i].addTo(map.current);
					if (i === vehicleMarkers.length - 1) {
						callback();
					}
				}, 0);
			}
		};

		const removeVehicleMarkers = () => {
			for (let i = 0; i < vehicleMarkers.length; i++) {
				map.current.removeLayer(vehicleMarkers[i]);
			}
		};

		if (map !== null && map.current !== undefined) {
			/*L.tileLayer('https://{s}.tile.jawg.io/jawg-matrix/{z}/{x}/{y}{r}.png?access-token={accessToken}', {
                attribution: '<a href="http://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank">&copy; <b>Jawg</b>Maps</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                minZoom: 0,
                maxZoom: 22,
                subdomains: 'abcd',
                accessToken: process.env.REACT_APP_JAWG_API_KEY,
            }).addTo(mymap);*/
			/*L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}{r}.{ext}', {
                attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                subdomains: 'abcd',
                minZoom: 0,
                maxZoom: 18,
                ext: 'png'
            }).addTo(mymap);*/
			/*let marker = L.marker([51.5, -0.09]).addTo(mymap);
            let circle = L.circle([51.508, -0.11], {
                color: 'red',
                fillColor: '#f03',
                fillOpacity: 0.5,
                radius: 500
            }).addTo(mymap);
            let polygon = L.polygon([
                [51.509, -0.08],
                [51.503, -0.06],
                [51.51, -0.047]
            ]).addTo(mymap);
            marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();
            circle.bindPopup("I am a circle.");
            polygon.bindPopup("I am a polygon.");
            */
			removeVehicleMarkers();
			addVehiclesToMap();

			let popup = L.popup();
			let onMapClick = (e) => {
				popup
					.setLatLng(e.latlng)
					.setContent('You clicked the map at ' + e.latlng.toString())
					.openOn(map.current);
			};

			map.current.on('click', onMapClick);
		}
	}, [props.vehicles, props.finishLoading]);

	useEffect(() => {
		const stopMarkers = props.stops.map((stop) => {
			const marker = L.marker([stop.latitude, stop.longitude]);
			marker.setOpacity(0.5);
			marker.bindPopup(
				`<b>Parada ${stop.stopName}</b><br>Endereço: ${stop.stopAddress}`
			);
			return marker;
		});

		const addStopsToMap = () => {
			console.log(stopMarkers.length);
			for (let i = 0; i < stopMarkers.length; i++) {
				setTimeout(() => {
					stopMarkers[i].addTo(map.current);
				}, 0);
			}
		};

		const removeStopMarkers = () => {
			for (let i = 0; i < stopMarkers.length; i++) {
				map.current.removeLayer(stopMarkers[i]);
			}
		};

		if (map !== null && map.current !== undefined) {
			removeStopMarkers();
			addStopsToMap();
		}
	}, [props.stops]);

	return (
		<div id="map-container">
			<SearchBar updateMap={() => {}} queryInformation={() => {}} />
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
	finishLoading: PropTypes.func,
};

export default Map;
