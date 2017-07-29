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

		const group = new window.H.map.Group();
		map.addObject(group);

		// add 'tap' event listener, that opens info bubble, to the group
		group.addEventListener('tap', function (evt) {
			// event target is the marker itself, group is a parent event target
			// for all objects that it contains
			var bubble =  new window.H.ui.InfoBubble(evt.target.getPosition(), {
				// read custom data
				content: evt.target.getData()
			});
			// show info bubble
			ui.addBubble(bubble);
		}, false);

		careProvider.map( (place) => {
			return place.LATITUDE && place.LONGITUDE &&
			this.addMarkerToGroup({groupTarget: group, lat: place.LATITUDE, lng: place.LONGITUDE, contentsHTML: '<div>hello</div>'}) 
		});

	}

	initializeCredential = () => {
		window.platform = new window.H.service.Platform({
			'app_id': 'hB3opaBMaVphS4nFxb5W',
			'app_code': 'pCNQnASsLB9YnsLFd15eUw'
		});
	}

	addMarkerToGroup({groupTarget, lat, lng, contentsHTML}) {
		const marker = new window.H.map.Marker({lat:lat, lng:lng});
		marker.setData(contentsHTML);
		groupTarget.addObject(marker);
	}

	render() {
		return (
			<div id="mapContainer" style={{height: '100vh', width: '100vw'}}>
			</div>
		)
	}
}
