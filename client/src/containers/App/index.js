import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import history from '../../configs/history';
import { connect } from 'react-redux';
import Navbar from '../../components/Navbar';
import './App.css';
import { drawerWidth } from '../../constants/values';
import { UserSidebar, AdminSidebar } from '../../components/Sidebar';
import Paper from 'material-ui/Paper';
import Posts from '../Posts';
import PostDetail from '../PostDetail';
import MapStatistic from '../MapStatistic';
import CityStatistic from '../CityStatistic';
import NewPost from '../NewPost';
import { withStyles } from 'material-ui/styles';
import Snackbar from 'material-ui/Snackbar';
import IconButton from 'material-ui/IconButton';
import CloseIcon from 'material-ui-icons/Close';
import { closeSnack } from '../../actions/actionCenter';
import Loader from '../../components/Loader';
import PostList from '../PostList';
import EditPost from '../EditPost';
import UserLogin from '../UserLogin';
import AdminLogin from '../AdminLogin';
import { preload, userLogout, adminLogout } from '../../actions/actor';
import Splash from '../../components/Splash';
import UserSignup from '../UserSignup';
import Search from '../Search';
import { push } from 'react-router-redux';

const style = {
	paper: {
		width: drawerWidth,
		position: 'fixed',
		overflowY: 'auto',
		overflowX: 'hidden',
		height: '100vh',
		zIndex: 1500,
		background: '#F5F5F5'
	},
	container: {
		display: 'flex'
	},
	contentWrapper: {
		marginTop: 65,
		marginLeft: drawerWidth,
		padding: 10,
		width: '100%'
	}
};

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			appLoaded: false
		}
		this.handleSnackbarRequestClose = this.handleSnackbarRequestClose.bind(this);
		this.handleLogout = this.handleLogout.bind(this);
		this.handleSearch = this.handleSearch.bind(this);
	}

	componentDidMount() {
		this.props.preload(() => {
			console.log("Loaded actors");
			this.setState({
				appLoaded: true
			});
		});
	}

	handleSnackbarRequestClose(e, reason) {
		if (reason !== "clickaway") {
			this.props.closeSnack();
		}
	}

	handleLogout(type) {
		if (type === 'user') {
			this.props.userLogout();
		} else {
			this.props.adminLogout();
		}
	}

	handleSearch(query) {
		this.props.push(`/search?q=${query}`);
	}

	render() {
		if (!this.state.appLoaded) {
			return <Splash />;
		}
		const { classes, actionCenter, actor } = this.props;
		return (
			<ConnectedRouter history={history}>
				<div className={classes.container}>
					<Navbar title="Danh Sách Bài Báo"
						actor={actor}
						onLogout={this.handleLogout}
						onSearch={this.handleSearch}
					/>
					<Snackbar
						anchorOrigin={{
							vertical: 'bottom',
							horizontal: 'left',
						}}
						open={actionCenter.snack.show}
						autoHideDuration={6000}
						onRequestClose={this.handleSnackbarRequestClose}
						message={<span>{actionCenter.snack.message}</span>}
						action={[
							<IconButton
								key="close"
								color="accent"
								onClick={this.handleSnackbarRequestClose}
							>
								<CloseIcon />
							</IconButton>
						]}
					/>
					<Loader
						open={actionCenter.loader}
					/>
					<Paper className={classes.paper}>
						<Switch>
							<Route exact path="/admin*" render={() => <AdminSidebar showContent={actor.admin !== null} />} />
							<Route exact path="*" component={UserSidebar} />
						</Switch>
					</Paper>
					<div className={classes.contentWrapper}>
						<Switch>
							<Route exact path="/posts" component={Posts} />
							<Route exact path="/posts/:id" component={PostDetail} />
							<Route exact path="/statistic/map" component={MapStatistic} />
							<Route exact path="/statistic/city" component={CityStatistic} />
							<Route exact path="/login" component={UserLogin} />
							<Route exact path="/signup" component={UserSignup} />
							<Route exact path="/search" component={Search} />
						{/* For Admin */}
							<Route exact path="/admin/new" component={NewPost} />
							<Route exact path="/admin/login" component={AdminLogin} />
							<Route exact path="/admin/postlist" component={PostList} />
							<Route exact path="/admin/edit/:id" component={EditPost} />
						</Switch>
					</div>
				</div>
			</ConnectedRouter>
		)
	}
}

export default connect(state => ({
	actionCenter: state.actionCenter,
	actor: state.actor
}), {
	closeSnack, 
	preload,
	userLogout,
	adminLogout,
	push
})(withStyles(style)(App));
