import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, TextField, Typography, Button } from 'material-ui';
import PaperContainer from '../../components/PaperContainer';
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl } from 'material-ui/Form';
import { getPost, updatePost } from '../../actions/post';
import moment from 'moment';
import { push } from 'react-router-redux';

class EditPost extends Component {
	constructor(props) {
		super(props);
		this.state = {
			_id: '',
			title: '',
			description: '',
			content: '',
			time: '',
			place: '',
			dead: '',
			injured: ''
		}
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleCancel = this.handleCancel.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	async componentDidMount() {
		const { id } = this.props.match.params;
		const post = await this.props.getPost(id);
		this.setState({
			_id: post._id,
			title: post.title,
			description: post.description,
			content: post.content,
			time: moment(post.time).format('YYYY-MM-DD'),
			place: post.place.raw,
			dead: post.dead,
			injured: post.injured
		});
	}

	handleInputChange(name) {
		return e => {
			this.setState({
				[name]: e.target.value
			})
		}
	}

	handleSubmit() {
		this.props.updatePost(this.state);
	}

	handleCancel() {
		this.props.push('/admin/postlist');
	}

	render() {
		return (
			<PaperContainer>
				<Typography type="headline" component="h3">
					Sửa
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
						<Button
							raised
							color="accent"
							onClick={this.handleCancel}
						>
							Quay về
						</Button>
					</Grid>
				</Grid>
			</PaperContainer>
		)
	}
}

export default connect(state => ({}), {
	getPost, updatePost,
	push
})(EditPost);
