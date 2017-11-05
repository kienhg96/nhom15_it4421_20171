import React, { Component } from 'react';
import { connect } from 'react-redux';
import LoginWrapper from '../../components/LoginWrapper';
import { Typography, TextField, Button } from 'material-ui';
import { push } from 'react-router-redux';
import { userSignup } from '../../actions/actor';

class Signup extends Component {
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			password: '',
			birthday: '',
			email: '',
			lastName: '',
			firstName: '',
			address: ''
		}
		this.handleFieldChange = this.handleFieldChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentDidMount() {
		if (this.props.user) {
			this.props.push('/');
		}
	}

	handleFieldChange(field) {
		return e => {
			this.setState({
				[field]: e.target.value
			});
		}
	}

	handleSubmit(e) {
		e.preventDefault();
		// console.log(this.state);
		this.props.userSignup(this.state);
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
							Đăng ký
						</Typography>
						<TextField
							label="Tên đăng nhập"
							margin="normal"
							fullWidth
							value={this.state.username}
							onChange={this.handleFieldChange('username')}
							required
						/>
						<TextField
							label="Mật khẩu"
							margin="normal"
							fullWidth
							type="password"
							value={this.state.password}
							onChange={this.handleFieldChange('password')}
							required
						/>
						<TextField
							label="Ngày sinh"
							margin="normal"
							fullWidth
							type="date"
							InputLabelProps={{
								shrink: true,
							}}
							value={this.state.birthday}
							onChange={this.handleFieldChange('birthday')}
						/>
						<TextField
							label="Email"
							margin="normal"
							fullWidth
							type="email"
							value={this.state.email}
							onChange={this.handleFieldChange('email')}
						/>
						<TextField
							label="Họ"
							margin="normal"
							fullWidth
							value={this.state.lastName}
							onChange={this.handleFieldChange('lastName')}
						/>
						<TextField
							label="Tên"
							margin="normal"
							fullWidth
							value={this.state.firstName}
							onChange={this.handleFieldChange('firstName')}
						/>
						<TextField
							label="Địa chỉ"
							margin="normal"
							fullWidth
							value={this.state.address}
							onChange={this.handleFieldChange('address')}
						/>
						<div style={{ textAlign: 'right' }}>
							<Button raised color="primary" type="submit">
								Đăng ký
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
	userSignup
})(Signup);
