import React, { Component } from 'react'
import mapFile from './mapFile.json'

export default class HereMap extends Component {
	componentDidMount() {
		this.initializeCredential();

		// Obtain the default map types from the platform object:
		const defaultLayers = window.platform.createDefaultLayers();

		// Instantiate (and display) a map object:
		this.map = new window.H.Map(
			document.getElementById('mapContainer'),
			defaultLayers.normal.map,
			{
				zoom: 14,
				center: { lat: -33.8688, lng: 151.2093 }
			});

		const behavior = new window.H.mapevents.Behavior(new window.H.mapevents.MapEvents(this.map));
		const ui = window.H.ui.UI.createDefault(this.map, defaultLayers);

		this.addBoundaries();
	}

	addBoundaries = () => {
		const { features } = mapFile;
		const coordinates = features.map((feature) => {
			const { geometry: { coordinates } } = feature
			return coordinates[0]
		})

		coordinates.forEach((coordPairs) => {
			this.addBoundary(coordPairs)
		})
	}

	addBoundary = (coordPairs) => {
		var geoStrip = new window.H.geo.Strip();

		coordPairs.forEach((flatCoord) => {
			console.log('ADDING SOMETHING', flatCoord[0], flatCoord[1], 0);
			geoStrip.pushLatLngAlt(flatCoord[1], flatCoord[0], 0)
		})

		this.map.addObject(
			new window.H.map.Polygon(geoStrip, {
				style: {
					fillColor: 'rgba(0, 85, 170, 0.4)',
					strokeColor: '#fff',
					lineWidth: 1
				}
			})
		);
	}

	initializeCredential = () => {
		console.log('Initializing here');
		window.platform = new window.H.service.Platform({
			'app_id': 'hB3opaBMaVphS4nFxb5W',
			'app_code': 'pCNQnASsLB9YnsLFd15eUw'
		});
	}

	render() {
		return (
			<div id="mapContainer" style={{ height: '100vh', width: '100vw' }}>
			</div>
		)
	}
}
