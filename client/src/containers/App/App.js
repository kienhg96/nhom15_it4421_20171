import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import history from '../../configs/history';
import { connect } from 'react-redux';

const Hi = () => (<div>Hi</div>)

class App extends Component {
	componentDidMount() {
		console.log('App mounted');
	}

	render() {
		return (
			<ConnectedRouter history={history}>
				<Switch>
					<Route exact path="/" component={Hi} />
				</Switch>
			</ConnectedRouter>
		)
	}
}

export default connect(state => ({}), {})(App);
