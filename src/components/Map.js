import React, { Component } from 'react'
import mapFile from './mapFile.json'
import careProvider from '../data/careProvider.json'

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
		const group = new window.H.map.Group();
		this.map.addObject(group);

		// add 'tap' event listener, that opens info bubble, to the group
		group.addEventListener('tap', function (evt) {
			// event target is the marker itself, group is a parent event target
			// for all objects that it contains
			var bubble = new window.H.ui.InfoBubble(evt.target.getPosition(), {
				// read custom data
				content: evt.target.getData()
			});
			// show info bubble
			this.ui.addBubble(bubble);
		}, false);

		careProvider.map((place) => {
			return place.LATITUDE && place.LONGITUDE &&
				this.addMarkerToGroup({ groupTarget: group, lat: place.LATITUDE, lng: place.LONGITUDE, contentsHTML: '<div>hello</div>' })
		});
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
