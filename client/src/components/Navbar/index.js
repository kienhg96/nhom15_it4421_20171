import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import { drawerWidth } from '../../constants/values';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import IconButton from 'material-ui/IconButton';
import Menu, { MenuItem } from 'material-ui/Menu';
import TextField from 'material-ui/TextField';
import MoreVertIcon from 'material-ui-icons/MoreVert';

const adminUrlPattern = /^\/admin.*/;

const styles = {
	root: {
		width: `calc(100% - ${drawerWidth}px)`,
		left: drawerWidth,
		background: '#455A64'
	},
	flex: {
		flex: 1,
	},
	menuButton: {
		marginLeft: -12,
		marginRight: 20,
	}
};

class UserNavbar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			anchorEl: null,
			search: ''
		}
		this.handleOpenMenu = this.handleOpenMenu.bind(this);
		this.handleLogoutClick = this.handleLogoutClick.bind(this);
		this.menuRequestClose = this.menuRequestClose.bind(this);
		this.handleSearch = this.handleSearch.bind(this);
	}

	handleOpenMenu(e) {
		this.setState({
			anchorEl: e.currentTarget
		});
	}

	menuRequestClose() {
		this.setState({
			anchorEl: null
		});
	}

	handleLogoutClick() {
		this.setState({
			anchorEl: null
		});
		this.props.onLogout();
	}

	handleSearch(e) {
		e.preventDefault();
		this.props.onSearch(this.state.search);
	}

	render() {
		const { classes, title, user } = this.props;
		return (
			<div>
				<AppBar position="fixed" className={classes.root}>
					<Toolbar>
						<Typography type="title" color="inherit"
							className={classes.flex}>
							{title}
						</Typography>
						<form style={{
							backgroundColor: '#CFD8DC',
							paddingLeft: 15,
							paddingRight: 15,
							paddingBottom: 5,
							paddingTop: 5,
							borderRadius: 5,
							marginRight: 10
						}} onSubmit={this.handleSearch}>
							<TextField
								placeholder="Tìm kiếm"
								color="contrast"
								InputProps={{
									disableUnderline: true
								}}
								value={this.state.search}
								onChange={e => this.setState({ search: e.target.value })}
							/>
						</form>
						{ user
							? <IconButton  color="contrast" onClick={this.handleOpenMenu}>
								<MoreVertIcon />
							</IconButton>
							: <div>
								<Link to="/signup">
									<Button color="contrast">Đăng ký</Button>
								</Link>
								<Link to="/login">
									<Button color="contrast">Đăng nhập</Button>
								</Link>
							</div>
						}
					</Toolbar>
				</AppBar>
				<Menu
					anchorEl={this.state.anchorEl}
					open={this.state.anchorEl !== null}
					onRequestClose={this.menuRequestClose}
				>
					<MenuItem onClick={this.handleLogoutClick}>
						Đăng xuất
					</MenuItem>
				</Menu>
			</div>
		);
	}
}

class AdminNavbar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			anchorEl: null,
			search: ''
		}
		this.handleOpenMenu = this.handleOpenMenu.bind(this);
		this.menuRequestClose = this.menuRequestClose.bind(this);
		this.handleLogoutClick = this.handleLogoutClick.bind(this);
		this.handleSearch = this.handleSearch.bind(this);
	}

	handleOpenMenu(e) {
		this.setState({
			anchorEl: e.currentTarget
		});
	}

	menuRequestClose() {
		this.setState({
			anchorEl: null
		});
	}

	handleLogoutClick() {
		this.setState({
			anchorEl: null
		});
		this.props.onLogout();
	}

	handleSearch(e) {
		e.preventDefault();
		this.props.onSearch(this.state.search);
	}
	
	render() {
		const { classes, title, admin } = this.props;
		return (
			<div>
				<AppBar position="fixed" className={classes.root}>
					<Toolbar>
						<Typography type="title" color="inherit"
							className={classes.flex}>
							{title}
						</Typography>
						<form style={{
							backgroundColor: '#BBDEFB',
							paddingLeft: 10,
							paddingRight: 10,
							paddingBottom: 5,
							paddingTop: 5,
							borderRadius: 5
						}} onSubmit={this.handleSearch}>
							<TextField
								placeholder="Tìm kiếm"
								color="contrast"
								InputProps={{
									disableUnderline: true
								}}
								value={this.state.search}
								onChange={e => this.setState({ search: e.target.value })}
							/>
						</form>
						{ admin
							? <IconButton  color="contrast" onClick={this.handleOpenMenu}>
								<MoreVertIcon />
							</IconButton>
							: <Link to="/admin/login">
								<Button color="contrast">Đăng nhập</Button>
							</Link>
						}
					</Toolbar>
				</AppBar>
				<Menu
					anchorEl={this.state.anchorEl}
					open={this.state.anchorEl !== null}
					onRequestClose={this.menuRequestClose}
				>
					<MenuItem onClick={this.handleLogoutClick}>
						Đăng xuất
					</MenuItem>
				</Menu>
			</div>
		);
	}
}

const StyledAdminNavbar = withStyles(styles)(AdminNavbar);
const StyledUserNavbar = withStyles(styles)(UserNavbar);

const Navbar = ({ title, location, actor, onLogout, onSearch }) => {
	const adminPage = adminUrlPattern.test(location.pathname);
	return adminPage 
		? <StyledAdminNavbar
			admin={actor.admin}
			title={title}
			onLogout={() => onLogout('admin')}
			onSearch={onSearch}
		/> 
		: <StyledUserNavbar
			user={actor.user}
			title={title}
			onLogout={() => onLogout('user')}
			onSearch={onSearch}
		/>;
}

export default withRouter(Navbar);
