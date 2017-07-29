import React, { Component } from 'react'

export default class HereMap extends Component {
	componentDidMount() {
		this.initializeCredential();

		// Obtain the default map types from the platform object:
		const defaultLayers = window.platform.createDefaultLayers();

		// Instantiate (and display) a map object:
		const map = new window.H.Map(
			document.getElementById('mapContainer'),
			defaultLayers.normal.map,
			{
				zoom: 10,
				center: { lat: 52.5, lng: 13.4 }
			});
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
			<div id="mapContainer" style={{height: '100vh', width: '100vw'}}>
			</div>
		)
	}
}
