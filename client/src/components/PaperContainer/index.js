import React from 'react';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';

export default withStyles({
	root: {
		padding: 20
	}
})(({classes, children}) => (
	<Paper classes={classes}>
		{children}
	</Paper>
));
