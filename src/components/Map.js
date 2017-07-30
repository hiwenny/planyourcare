import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { updateSuburb } from '../actions/app';
import interpolate from 'color-interpolate';
import mapFile from '../data/nsw2_optimized2.json';
// import mapFile from '../data/nsw2_opt1.json';
import careProvider from '../data/CHILDCARE_DATA.json';
import { sa3ByRegionYear, scaleSmallestLargest, regionScaleBy } from '../data/sa3_data';

class HereMap extends Component {
	constructor() {
		super()
		this.boundaryObjects = []
	}

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
		if (this.group) {
			this.map.removeObject(this.group);
		}
		this.addMarkers();
	}

	// updateSuburbOnHover = (newSuburb, e) => {
	// 	const { dispatch } = this.props;
	// 	console.log(newSuburb);
	// 	console.log(e)
	// 	return dispatch(updateSuburb(newSuburb));
	// }

	filterData = (data, { year, suburb }) => {
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
		this.group = group
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

	componentDidUpdate = (newProps) => {
		this.boundaryObjects.forEach(x => {
			this.map.removeObject(x)
		})
		this.boundaryObjects = []
		this.addBoundaries()
	}

	addBoundaries = () => {
		const { features } = mapFile;
		let coors = []
		features.forEach((feature) => {
			let { geometry = {}, properties } = feature
			if (geometry === null) {
				geometry = {}
			}
			const { coordinates, type } = geometry
			if (typeof type === 'undefined') {
				return
			}

			// console.log('PROPERTIES', properties.SA3_NAME16);
			if (type === 'Polygon') {
				const c = coordinates && coordinates.length && coordinates[0];
				const pushed = {
					region: properties.SA3_NAME16,
					coordPairs: c,
				}
				coors.push(pushed);
			} else if (type === 'MultiPolygon') {
				coordinates.forEach((c2) => {
					const flatten = [].concat(...c2)
					const pushed = {
						region: properties.SA3_NAME16,
						coordPairs: flatten,
					}
					coors.push(pushed)
				})
			}
		})

		const currSmallestLargestObj = scaleSmallestLargest[`${this.props.scaleBy}_${this.props.year}`]
		const getScale01 = (number) => {
			const { smallest, largest } = currSmallestLargestObj;
			return (number - smallest) / (largest - smallest);
		}

		coors.forEach((coordPairsRegionObject, index) => {
			const { region, coordPairs } = coordPairsRegionObject;
			if (!coordPairs) {
				return
			}

			const colormap = interpolate(['rgba(255, 0, 0, 0.5)', 'rgba(0, 255, 0, 0.5)']);
			const key = `${region}_${this.props.year}`;
			if (!sa3ByRegionYear[key]) {
				return;
			}

			let percentage = sa3ByRegionYear[key] ?
				getScale01(sa3ByRegionYear[key][this.props.scaleBy]) :
				0

			if (this.props.scaleBy === regionScaleBy.FEE_DAY ||
				this.props.scaleBy === regionScaleBy.UNPAID_CHILDCARE_RATIO) {
				percentage = 1 - percentage;
			}

			this.addBoundary(coordPairs, colormap(percentage))
		})
	}

	addBoundary = (coordPairs, backgroundColor) => {
		var geoStrip = new window.H.geo.Strip();

		coordPairs.forEach((pair) => {
			geoStrip.pushLatLngAlt(pair[1], pair[0], 0)
		})

		const obj = new window.H.map.Polygon(geoStrip, {
			style: {
				fillColor: backgroundColor,
				strokeColor: '#fff',
				lineWidth: 1
			}
		});

		this.boundaryObjects.push(obj)
		this.map.addObject(obj);
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
		scaleBy: store.app.scaleBy,
		year: store.app.year,
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
