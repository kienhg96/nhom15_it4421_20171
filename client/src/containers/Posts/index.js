import React, { Component } from 'react';
import { connect } from 'react-redux';
import PostBrief from '../../components/PostBrief';
import { load, loadPage } from '../../actions/post';
import Paginate from 'react-paginate';
import './paginate.css';
import { Paper } from 'material-ui';
import NextIcon from 'material-ui-icons/KeyboardArrowRight';
import PrevIcon from 'material-ui-icons/KeyboardArrowLeft';

class Posts extends Component {
	componentDidMount() {
		this.props.load();
	}

	handlePageChange(e) {
		const page = e.selected + 1;
		this.props.loadPage(page);
	}

	render() {
		return (
			<div>
				{this.props.posts.map(post => (
					<PostBrief
						key={post._id}
						title={post.title}
						description={post.description}
						dead={post.dead}
						injured={post.injured}
						place={post.place.raw}
						_id={post._id}
						time={post.time}
					/>
				))}
				<Paper>
					<Paginate
						previousLabel={<PrevIcon />}
						nextLabel={<NextIcon />}
						breakLabel={<span>...</span>}
						breakClassName={"break-me"}
						pageCount={Math.ceil(this.props.meta.count / this.props.meta.pageSize)}
						marginPagesDisplayed={2}
						pageRangeDisplayed={5}
						forcePage={this.props.page - 1}
						onPageChange={this.handlePageChange}
						containerClassName={"pagination"}
						subContainerClassName={"pages pagination"}
						activeClassName={"active"}
					/>
				</Paper>
			</div>
		)
	}
}

export default connect(state => ({
	posts: state.post.data,
	meta: state.post.meta,
	page: state.post.page
}), {
	load,
	loadPage
})(Posts);
