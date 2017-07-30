import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { updateSuburb } from '../actions/app';
import interpolate from 'color-interpolate';
import mapFile from '../data/nsw2_optimized2.json';
// import mapFile from '../data/nsw2_opt1.json';
import careProvider from '../data/CHILDCARE_DATA.json';

class HereMap extends Component {
	componentDidMount() {
		this.filteredData = this.filterData(careProvider, this.props);
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

		this.behavior = new window.H.mapevents.Behavior(new window.H.mapevents.MapEvents(this.map));
		this.ui = window.H.ui.UI.createDefault(this.map, defaultLayers);

		this.addBoundaries();
		this.addMarkers();
	}

	componentWillUpdate(nextProps, nextState) {
		this.filteredData = this.filterData(careProvider, nextProps);
	}

	// updateSuburbOnHover = (newSuburb, e) => {
	// 	const { dispatch } = this.props;
	// 	console.log(newSuburb);
	// 	console.log(e)
	// 	return dispatch(updateSuburb(newSuburb));
	// }

	filterData = (data, {year, suburb}) => {
		const filtered = data.filter((place) => (
					place.YEAR === year && place.SA3_name === suburb));
		console.log(filtered)
		return filtered;
	}

	addMarkers = () => {
		const stubData = [
			{ availability: 31 },
			{ availability: 47 },
			{ availability: 16 },
			{ availability: 44 },
			{ availability: 36 },
			{ availability: 22 },
			{ availability: 10 },
			{ availability: 62 },
			{ availability: 53 },
			{ availability: 69 }
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

		this.filteredData.map((place) => {
			const stub = stubData[Math.floor(Math.random() * 10)];
			try {
				this.addMarkerToGroup({
					groupTarget: group, lat: place.LATITUDE, lng: place.LONGITUDE, contentsHTML: `
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
		// console.log('FEATUREs', features);
		let coors = []
		features.forEach((feature) => {
			let { geometry = {}, properties } = feature
			if (geometry === null) {
				// console.log('FEATURE', feature);
				geometry = {}
			}
			const { coordinates, type } = geometry
			if (typeof type === 'undefined') {
				// console.log('type is undefined');
				return
			}

			// console.log('PROPERTIES', properties.SA3_NAME16);
			if (type === 'Polygon') {
				const c = coordinates && coordinates.length && coordinates[0];
				// console.log('C', c);
				coors.push(c);
			} else if (type === 'MultiPolygon') {
				// console.log('C2', c);
				coordinates.forEach((c2) => {
					const flatten = [].concat(...c2)
					coors.push(flatten)
				})
				// let concatenated = [].concat(...coordinates)
				// concatenated = [].concat(...concatenated)
				// console.log('CONCATENATED', concatenated);
				// coors.push(concatenated)
				// c.forEach((c2) => {
				// 	coors.push(c2);
				// });
			}
			// console.log('Coors', coors);
		})
		// console.log('COORS LENGTH', coors.length);

		coors.forEach((coordPairs, index) => {
			if (!coordPairs) {
				return
			}

			const colormap = interpolate(['rgba(255, 0, 0, 0.5)', 'rgba(0, 255, 0, 0.5)']);
			this.addBoundary(coordPairs, colormap(index / coors.length))
		})
	}

	addBoundary = (coordPairs, backgroundColor) => {
		var geoStrip = new window.H.geo.Strip();

		coordPairs.forEach((pair) => {
			// console.log('ADDING COORDPAIRS', pair);
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
			<div id="mapContainer" style={{ height: '100vh', width: '100%' }}>
			</div>
		)
	}
}

function mapStateToProps(store) {
  return {
    suburb: store.app.suburb,
    capacity: store.app.capacity,
    budget: store.app.budget,
    year: store.app.year
  }
}


HereMap.defaultProps = {
  suburb: 'Sydney',
}

HereMap.propTypes = {
  suburb: PropTypes.string,
  dispatch: PropTypes.func,
}
export default connect(mapStateToProps)(HereMap)
