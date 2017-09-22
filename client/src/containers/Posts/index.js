import React, { Component } from 'react';
import { connect } from 'react-redux';
import PostBrief from '../../components/PostBrief';
import { loadPosts } from '../../actions/post';

class Posts extends Component {
	componentDidMount() {
		if (this.props.posts.length === 0) {
			this.props.loadPosts();
		}
	}

	render() {
		return (
			<div>
				{this.props.posts.map(post => (
					<PostBrief
						key={post._id}
						title={post.title}
						dead={post.dead}
						injured={post.injured}
						place={post.place.raw}
						_id={post._id}
						time={post.time}
					/>
				))}
			</div>
		)
	}
}

export default connect(state => ({
	posts: state.post.data
}), {
	loadPosts
})(Posts);
