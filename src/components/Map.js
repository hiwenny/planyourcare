import React, { Component } from 'react'

export default class HereMap extends Component {
	componentDidMount() {
		const careProvider = require('../data/careProvider.json');
		this.initializeCredential();

		// Obtain the default map types from the platform object:
		const defaultLayers = window.platform.createDefaultLayers();

		// Instantiate (and display) a map object:
		const map = new window.H.Map(
			document.getElementById('mapContainer'),
			defaultLayers.normal.map,
			{
				zoom: 14,
				center: { lat: -33.8688, lng: 151.2093 }
			});
		const behavior = new window.H.mapevents.Behavior(new window.H.mapevents.MapEvents(map));
		const ui = window.H.ui.UI.createDefault(map, defaultLayers);

		const geocoder = window.platform.getGeocodingService();
		careProvider.map( (place) => {
			place.LATITUDE && place.LONGITUDE &&
			this.addMarkersToMap({mapTarget: map, lat: place.LATITUDE, lng: place.LONGITUDE}) 
		});
	}

	initializeCredential = () => {
		window.platform = new window.H.service.Platform({
			'app_id': 'hB3opaBMaVphS4nFxb5W',
			'app_code': 'pCNQnASsLB9YnsLFd15eUw'
		});
	}

	addMarkersToMap({mapTarget, lat, lng}) {
		const marker = new window.H.map.Marker({lat:lat, lng:lng});
		mapTarget.addObject(marker);
	}

	render() {
		return (
			<div id="mapContainer" style={{height: '100vh', width: '100vw'}}>
			</div>
		)
	}
}
