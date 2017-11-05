import React, { Component } from 'react';
import PaperContainer from '../../components/PaperContainer';
import { TextField, Typography } from 'material-ui';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import { getPost, postComment } from '../../actions/post';
import './comment.css';

class PostDetail extends Component {
	constructor(props) {
		super(props);
		this.state = {
			post: {},
			comment: ''
		}
		this.loadPost = this.loadPost.bind(this);
		this.handleCommentChange = this.handleCommentChange.bind(this);
		this.handleSubmitComment = this.handleSubmitComment.bind(this);
	}

	componentDidMount() {
		this.loadPost();
	}

	componentWillReceiveProps(props) {
		if (this.props.match.params.id !== props.match.params.id) {
			this.loadPost();
		}
	}

	async loadPost() {
		const _id = this.props.match.params.id;
		const post = await this.props.getPost(_id);
		if (!post) {
			return this.props.push('/posts');
		}
		this.setState({ post });
	}

	handleCommentChange(e) {
		this.setState({
			comment: e.target.value
		})
	}

	handleSubmitComment(e) {
		e.preventDefault();
		this.props.postComment(this.state.post._id, this.state.comment)
		.then(commentObj => {
			this.setState(state => ({
				comment: '',
				post: {
					...state.post,
					comments: [...state.post.comments, commentObj]
				}
			}))
		})
	}

	render() {
		if (!this.state.post._id) {
			return (
				<PaperContainer>
					Loading...
				</PaperContainer>
			)
		}
		return (
			<div>
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
				<div style={{ marginTop: 20 }}>
					<PaperContainer>
					{ this.state.post.comments.map(c => (
						<div key={c._id} className="comment-wrapper">
							<span className="comment-user">
								{c.user.lastName} {c.user.firstName}
							</span>{": "}
							<span>{c.content}</span>
						</div>
					))}
					{ this.props.user !== null && 
						<div>
							<form onSubmit={this.handleSubmitComment}>
								<TextField
									label="Gửi một bình luận"
									margin="normal"
									fullWidth
									value={this.state.comment}
									onChange={this.handleCommentChange}
									type="text"
								/>
							</form>
						</div>
					}
					</PaperContainer>
				</div>
			</div>
		);
	}
}

export default connect(state => ({
	user: state.actor.user
}), {
	push,
	getPost,
	postComment
})(PostDetail);
