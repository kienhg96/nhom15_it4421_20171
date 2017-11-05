import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, TextField, Typography, Button } from 'material-ui';
import PaperContainer from '../../components/PaperContainer';
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl } from 'material-ui/Form';
import { createPost } from '../../actions/post';

class NewPost extends Component {
	constructor(props) {
		super(props);
		this.state = {
			title: '',
			description: '',
			content: '',
			time: '',
			place: '',
			dead: '',
			injured: ''
		}
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleInputChange(name) {
		return e => {
			this.setState({
				[name]: e.target.value
			})
		}
	}

	handleSubmit() {
		this.props.createPost(this.state);
	}

	render() {
		return (
			<PaperContainer>
				<Typography type="headline" component="h3">
					Tạo tin mới
				</Typography>
				<Grid container spacing={24}>
					<Grid item xs={12}>
						<TextField
							label="Tiêu đề"
							fullWidth
							margin="normal"
							value={this.state.title}
							onChange={this.handleInputChange('title')}
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							label="Vắn tắt"
							fullWidth
							multiline
							rowsMax="4"
							margin="normal"
							value={this.state.description}
							onChange={this.handleInputChange('description')}
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							label="Nội dung"
							fullWidth
							multiline
							rowsMax="4"
							margin="normal"
							value={this.state.content}
							onChange={this.handleInputChange('content')}
						/>
					</Grid>
					<Grid item xs={6}>
						<FormControl fullWidth margin="normal">
							<InputLabel htmlFor="time" shrink>Thời gian</InputLabel>
							<Input id="time" type="date"
								value={this.state.time}
								onChange={this.handleInputChange('time')}
							/>
						</FormControl>
					</Grid>
					<Grid item xs={6}>
						<TextField
							label="Địa điểm"
							fullWidth
							margin="normal"
							value={this.state.place}
							onChange={this.handleInputChange('place')}
						/>
					</Grid>
					<Grid item xs={6}>
						<TextField
							label="Số người chết"
							fullWidth
							margin="normal"
							value={this.state.dead}
							onChange={this.handleInputChange('dead')}
						/>
					</Grid>
					<Grid item xs={6}>
						<TextField
							label="Số người bị thương"
							fullWidth
							margin="normal"
							value={this.state.injured}
							onChange={this.handleInputChange('injured')}
						/>
					</Grid>
					<Grid item xs={12}>
						<Button
							raised
							color="primary"
							style={{ marginRight: 10 }}
							onClick={this.handleSubmit}
						>
							Gửi
						</Button>
						<Button raised color="accent">Hủy</Button>
					</Grid>
				</Grid>
			</PaperContainer>
		)
	}
}

export default connect(state => ({}), {
	createPost
})(NewPost);
