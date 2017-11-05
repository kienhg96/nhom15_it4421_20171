import React from 'react';
import { Paper } from 'material-ui';
import { withStyles } from 'material-ui/styles';
import './LoginWrapper.css';

const styleSheet = {
	root: {
		paddingLeft: 16,
		paddingRight: 16,
		paddingBottom: 16,
		paddingTop: 26
	}
};

export default withStyles(styleSheet)((props) => (
	<div className="login-form-wrapper">
		<Paper {...props} />
	</div>
));
