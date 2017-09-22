import React, { Component } from 'react';
import GoogleMap from '../../components/GoogleMap';
import GoogleApiComponent from '../../components/GoogleApiComponent';
import Paper from 'material-ui/Paper';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

const apiKey = 'AIzaSyAN6XlIeNKkimBpfSOg5aOmHVQzzZ450lo';

class MapStatistic extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: []
		};
		this.loadData = this.loadData.bind(this);
	}

	async loadData() {
		try {
			let response = await fetch('/api/accident/locations', {
				credentials: 'same-origin'
			});
			response = await response.json();
			if (response.error) {
				console.log(response);
				return this.props.push('/');
			}
			this.setState({
				data: response.data
			}, () => {
			});
		} catch (err) {
			console.error(err);
			return this.props.push('/');
		}
	}

	componentDidMount() {
		this.loadData();
	}

	render() {
		return (
			<Paper>
				<div style={{
					height: 'calc(100vh - 150px)'
				}}>
					<GoogleApiComponent apiKey={apiKey}>
						<GoogleMap data={this.state.data} />
					</GoogleApiComponent>
				</div>
			</Paper>
		)
	}
}

export default connect(state => ({}), {
	push
})(MapStatistic);
