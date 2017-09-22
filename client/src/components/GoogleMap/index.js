import React, { Component } from 'react';

export default class GoogleMap extends Component {
	componentDidMount() {
		const { google } = this.props;
		const map = new google.maps.Map(this.mapView, {
			zoom: 6,
			center: { lat: 10.8230989, lng: 106.6296638 },
		});

		const heatmap = new google.maps.visualization.HeatmapLayer({
			data: this.props.data.map(({lat, lng}) => new google.maps.LatLng(lat, lng)),
		});

		heatmap.setMap(map);
		heatmap.set('radius', 20);
		this.heatmap = heatmap;
		window.heatmap = heatmap;
	}

	componentWillReceiveProps(props) {
		const { google } = this.props;
		this.heatmap.setData(props.data.map(({lat, lng}) => new google.maps.LatLng(lat, lng)));
	}

	render() {
		return (
			<div style={{
				width: '100%',
				height: '100%'
			}} ref={div => this.mapView = div}></div>
		)
	}
}
