import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import Chart from 'chart.js';

class CityStatistic extends Component {
	componentDidMount() {
		const ctx = this.canvas.getContext('2d');
		fetch('/api/accident/cities', {
			credentials: 'same-origin'
		})
		.then(response => response.json())
		.then(response => {
			if (response.error) {
				console.error(response);
				return this.props.push('/');
			}
			const { data } = response;
			const labels = data.map(d => d._id);
			const injured = data.map(d => d.injured);
			const dead = data.map(d => d.dead);
			window.chart = this.chart = new Chart(ctx, {
				type: 'bar',
				data: {
					labels: labels,
					datasets: [{
						label: 'Số người chết',
						data: dead,
						backgroundColor: 'rgba(255, 99, 132, 0.2)',
						borderColor: 'rgba(255,99,132,1)',
						borderWidth: 1
					}, {
						label: 'Số người bị thương',
						data: injured,
						backgroundColor: 'rgba(255, 206, 86, 0.2)',
						borderColor: 'rgba(255, 206, 86, 1)',
						borderWidth: 1
					}]
				},
				options: {
					scales: {
						yAxes: [{
							ticks: {
								beginAtZero:true
							}
						}]
					}
				}
			})
		})
		.catch(err => {
			console.error(err);
			return this.props.push('/');
		})
	}

	render() {
		return (
			<Paper>
				<div style={{
					height: 'calc(100vh - 150px)'
				}}>
					<canvas style={{
						width: '100%',
						height: '100%'
					}} ref={c => this.canvas = c}></canvas>
				</div>
			</Paper>
		)
	}
}

export default connect(state => ({}), {
	push
})(CityStatistic);
