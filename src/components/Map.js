import React, { Component } from 'react';
import interpolate from 'color-interpolate';
// import mapFile from './mapFile.json';
import mapFile from '../data/nswFiltered.json';
import careProvider from '../data/careProvider.json';

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
		this.ui = window.H.ui.UI.createDefault(this.map, defaultLayers);

		this.addBoundaries();
		this.addMarkers();
	}

	addMarkers = () => {
		const stubData = [
			{availability: 31},
			{availability: 47},
			{availability: 16},
			{availability: 44},
			{availability: 36},
			{availability: 22},
			{availability: 10},
			{availability: 62},
			{availability: 53},
			{availability: 69}

		];
		const group = new window.H.map.Group();
		this.map.addObject(group);

		// add 'tap' event listener, that opens info bubble, to the group
		group.addEventListener('tap', (evt) => {
			var bubble = new window.H.ui.InfoBubble(evt.target.getPosition(), {
				// read custom data
				content: evt.target.getData()
			});
			// show info bubble
			this.ui.addBubble(bubble);
		}, false);

		careProvider.map((place) => {
			const stub = stubData[Math.floor(Math.random()*10)];
			try {
					this.addMarkerToGroup({ groupTarget: group, lat: place.LATITUDE, lng: place.LONGITUDE, contentsHTML: `
						<div style="font-family:'PT Sans', sans-serif">
							<span>${place.PROVIDER_NAME}</span>
							<span style="font-size:1rem">Availability: ${stub.availability}</span>
						</div>` 
				});
			} catch (e) {
				console.log(e);
			}
		});
	}

	addBoundaries = () => {
		const { features } = mapFile;
		const coordinates = features.map((feature) => {
			const { geometry: { coordinates } } = feature
			return coordinates.length && coordinates[0].length && coordinates[0][0]
		})

		coordinates.forEach((coordPairs, index) => {
			if (!coordPairs) {
				return
			}

			const colormap = interpolate(['rgba(255, 0, 0, 0.5)', 'rgba(120, 120, 120, 0.5)']);
			this.addBoundary(coordPairs, colormap(index / coordinates.length))
		})
	}

	addBoundary = (coordPairs, backgroundColor) => {
		var geoStrip = new window.H.geo.Strip();

		coordPairs.forEach((pair) => {
			geoStrip.pushLatLngAlt(pair[1], pair[0], 0)
		})

		this.map.addObject(
			new window.H.map.Polygon(geoStrip, {
				style: {
					fillColor: backgroundColor,
					strokeColor: '#fff',
					lineWidth: 1
				}
			})
		);
	}

	initializeCredential = () => {
		window.platform = new window.H.service.Platform({
			'app_id': 'hB3opaBMaVphS4nFxb5W',
			'app_code': 'pCNQnASsLB9YnsLFd15eUw'
		});
	}

	addMarkerToGroup({ groupTarget, lat, lng, contentsHTML }) {
		const marker = new window.H.map.Marker({ lat: lat, lng: lng });
		marker.setData(contentsHTML);
		groupTarget.addObject(marker);
	}

	render() {
		return (
			<div id="mapContainer" style={{ height: '100vh', width: '100vw' }}>
			</div>
		)
	}
}
