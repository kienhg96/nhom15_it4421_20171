import React from 'react';
import { withStyles } from 'material-ui/styles';
import { CircularProgress } from 'material-ui/Progress';

const styles = {
	loaderWrapper: {
		position: 'fixed',
		top: 0,
		left: 0,
		bottom: 0,
		right: 0,
		zIndex: 2000,
		backgroundColor: 'rgba(255, 255, 255, 0.6)',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center'
	}
};

const Loader = ({ classes, open = false }) => (
	<div className={classes.loaderWrapper}
		style={{
			display: open ? 'flex' : 'none'
		}}
	>
		<CircularProgress size={80} />
	</div>
)

export default withStyles(styles)(Loader);
