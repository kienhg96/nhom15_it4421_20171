import React, { Component } from 'react';
import { connect } from 'react-redux';
import PostBrief from '../../components/PostBrief';
import { search } from '../../actions/post';
import Paginate from 'react-paginate';
import { Paper } from 'material-ui';
import NextIcon from 'material-ui-icons/KeyboardArrowRight';
import PrevIcon from 'material-ui-icons/KeyboardArrowLeft';

const parseQuery = str => {
	const arr = str.substr(1).split('&');
	const obj = {};
	arr.forEach(a => {
		const brr = a.split('=');
		obj[brr[0]] = brr[1];
	});
	return obj;
}

class Search extends Component {
	componentDidMount() {
		const { q } = parseQuery(this.props.location.search);
		this.props.search(q);
	}

	handlePageChange(e) {
		const { q } = parseQuery(this.props.location.search);
		const page = e.selected + 1;
		this.props.search(q, page);
	}

	componentWillReceiveProps({ location }) {
		const lstQ = parseQuery(this.props.location.search).q;
		const newQ = parseQuery(location.search).q;
		if (lstQ !== newQ) {
			this.props.search(newQ);
		}
	}

	render() {
		return (
			<div>
				{this.props.posts.length === 0 &&
					<div>Không tìm thấy kết quả nào</div>
				}
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
	posts: state.search.data,
	meta: state.search.meta,
	page: state.search.page,
	query: state.search.query
}), {
	search
})(Search);
