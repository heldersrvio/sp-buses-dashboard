import React, { useEffect, useRef } from 'react';
import SearchBar from './SearchBar';
import PropTypes from 'prop-types';
import L from 'leaflet';

const Map = (props) => {
	const map = useRef(null);

	useEffect(() => {
		const addVehiclesToMap = () => {
			for (let i = 0; i < props.vehicles.length; i++) {
				setTimeout(() => {
					const vehicleMarker = L.marker([
						props.vehicles[i].latitude,
						props.vehicles[i].longitude,
					]).addTo(map.current);
					vehicleMarker.bindPopup(
						`<b>Ônibus ${props.vehicles[i].prefix}</b><br>Linha ${
							props.vehicles[i].lineCode
						}<br>${
							props.vehicles[i].accessibility
								? 'Acessível para pessoas com deficiência'
								: 'Não acessível para pessoas com deficiência'
						}`
					);
					if (i === props.vehicles.length - 1) {
						props.finishLoading();
					}
				}, 0);
			}
		};

		const addStopsToMap = () => {
			for (let i = 0; i < props.stops.length; i++) {
				setTimeout(() => {
					const stopMarker = L.marker([
						props.stops[i].latitude,
						props.stops[i].longitude,
					]).addTo(map.current);
					stopMarker.setOpacity(0.5);
					stopMarker.bindPopup(
						`<b>Parada ${props.stops[i].stopName}</b><br>Endereço: ${props.stops[i].stopAddress}`
					);
				}, 0);
			}
		};

		if (map !== null && map.current !== undefined) {
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
			addVehiclesToMap();
			addStopsToMap();

			let popup = L.popup();
			let onMapClick = (e) => {
				popup
					.setLatLng(e.latlng)
					.setContent('You clicked the map at ' + e.latlng.toString())
					.openOn(map.current);
			};

			map.current.on('click', onMapClick);
		}
	}, [props]);

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
