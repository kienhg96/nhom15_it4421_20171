import React from 'react';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import { drawerWidth } from '../../constants/values';

const styles = {
	root: {
		width: `calc(100% - ${drawerWidth}px)`,
		left: drawerWidth
	},
	flex: {
		flex: 1,
	},
	menuButton: {
		marginLeft: -12,
		marginRight: 20,
	},
};

const Navbar = ({ classes, title }) => (
	<AppBar position="fixed" className={classes.root}>
		<Toolbar>
			<Typography type="title" color="inherit"
				className={classes.flex}>
				{title}
			</Typography>
			<Button color="contrast">Login</Button>
		</Toolbar>
	</AppBar>
);

export default withStyles(styles)(Navbar);
