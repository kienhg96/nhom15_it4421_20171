import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import history from '../../configs/history';
import { connect } from 'react-redux';
import Navbar from '../../components/Navbar';
import './App.css';
import { drawerWidth } from '../../constants/values';
import Sidebar from '../../components/Sidebar';
import Paper from 'material-ui/Paper';
import Posts from '../Posts';
import PostDetail from '../PostDetail';
import MapStatistic from '../MapStatistic';
import CityStatistic from '../CityStatistic';

class App extends Component {
	componentDidMount() {
		console.log('App mounted');
	}

	render() {
		return (
			<ConnectedRouter history={history}>
				<div style={{
					display: 'flex'
				}}>
					<Navbar
						title="Danh Sách Bài Báo"
					/>
					<Paper style={{
						width: drawerWidth,
						position: 'fixed',
						overflowY: 'auto',
						overflowX: 'hidden',
						height: '100vh'
					}}>
						<Sidebar />
					</Paper>
					<div style={{
						marginTop: 65,
						marginLeft: drawerWidth,
						padding: 10,
						width: '100%'
					}}>
						<Switch>
							<Route exact path="/posts" component={Posts} />
							<Route exact path="/posts/:id" component={PostDetail} />
							<Route exact path="/statistic/map" component={MapStatistic} />
							<Route exact path="/statistic/city" component={CityStatistic} />
						</Switch>
					</div>
				</div>
			</ConnectedRouter>
		)
	}
}

export default connect(state => ({}), {
	
})(App);
