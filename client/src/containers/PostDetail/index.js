import React, { Component } from 'react';
import PaperContainer from '../../components/PaperContainer';
import Typography from 'material-ui/Typography';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';

class PostDetail extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: true,
			post: {}
		}
		this.loadPost = this.loadPost.bind(this);
	}

	componentDidMount() {
		this.loadPost();
	}

	componentWillReceiveProps(props) {
		if (this.props.match.params.id !== props.match.params.id) {
			this.loadPost();
		}
	}

	loadPost() {
		if (!this.state.loading) {
			this.setState({
				loading: true
			})
		}
		const _id = this.props.match.params.id;
		fetch(`/api/post?_id=${_id}`, {
			credentials: 'same-origin'
		})
		.then(response => response.json())
		.then(response => {
			if (response.error || !response.data) {
				console.log(response);
				return this.props.push('/posts');
			}
			this.setState({
				loading: false,
				post: response.data
			});
		})
		.catch(err => {
			console.error(err);
			this.props.push('/posts');
		});
	}

	render() {
		if (this.state.loading) {
			return (
				<PaperContainer>
					Loading...
				</PaperContainer>
			)
		}
		return (
			<PaperContainer>
				<Typography type="headline">
					{this.state.post.title}
				</Typography>
				<Typography type="body1">
					{this.state.post.content.split('\n').map((phrase, index) => (
						<span key={index} style={{
							display: 'block',
							marginBottom: 10
						}}>
							{phrase}
						</span>
					))}
				</Typography>
			</PaperContainer>
		);
	}
}

export default connect(state => ({}), {
	push
})(PostDetail);
