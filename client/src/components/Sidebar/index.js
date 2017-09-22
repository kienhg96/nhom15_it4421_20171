import React from 'react';
import { withStyles } from 'material-ui/styles';
import Drawer from 'material-ui/Drawer';
import Divider from 'material-ui/Divider';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Typography from 'material-ui/Typography';
import { Link } from 'react-router-dom';

const style = {
	drawerPaper: {
		position: 'relative',
		height: '100%',
		width: '100%'
	},
	drawerHeader: {
		minHeight: 64,
		display: 'flex',
		alignItems: 'center',
		paddingLeft: 20
	},
};

const Sidebar = ({ classes }) => (
	<Drawer
		type="permanent"
		classes={{
			paper: classes.drawerPaper,
		}}
	>
		<div className={classes.drawerHeader}>
			<Typography type="title">
				TKGT
			</Typography>
		</div>
		<Divider />
		<List>
			<Link to="/posts">
				<ListItem button>
						<ListItemText primary="Các bài báo" />
				</ListItem>
			</Link>
			<Link to="/statistic/map">
				<ListItem button>
					<ListItemText primary="Thống kê trên bản đồ" />
				</ListItem>
			</Link>
			<Link to="/statistic/city">
				<ListItem button>
					<ListItemText primary="Thống kê theo thành phố" />
				</ListItem>
			</Link>
		</List>
	</Drawer>
);

export default withStyles(style)(Sidebar);
