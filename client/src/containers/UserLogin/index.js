import React, { Component } from 'react';
import { connect } from 'react-redux';
import LoginWrapper from '../../components/LoginWrapper';
import { Typography, TextField, Button } from 'material-ui';
import { push } from 'react-router-redux';
import { userLogin } from '../../actions/actor';

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			password: ''
		}
		this.handleUsername = this.handleUsername.bind(this);
		this.handlePassword = this.handlePassword.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentDidMount() {
		if (this.props.user) {
			this.props.push('/');
		}
	}

	handleUsername(e) {
		this.setState({
			username: e.target.value
		});
	}

	handlePassword(e) {
		this.setState({
			password: e.target.value
		});
	}

	handleSubmit(e) {
		e.preventDefault();
		this.props.userLogin(this.state);
	}
	
	render() {
		return (
			<div className="login-container">
				<form onSubmit={this.handleSubmit}>
					<LoginWrapper>
						<Typography
							type="display1"
							align="center"
						>
							Đăng nhập
						</Typography>
						<TextField
							label="Username"
							margin="normal"
							fullWidth
							value={this.state.username}
							onChange={this.handleUsername}
						/>
						<TextField
							label="Password"
							margin="normal"
							fullWidth
							type="password"
							value={this.state.password}
							onChange={this.handlePassword}
						/>
						<div style={{ textAlign: 'right' }}>
							<Button raised color="primary" type="submit">
								Đăng nhập
							</Button>
						</div>
					</LoginWrapper>
				</form>
			</div>
		)
	}
}

export default connect(state => ({
	user: state.actor.user
}), {
	push,
	userLogin
})(Login);
