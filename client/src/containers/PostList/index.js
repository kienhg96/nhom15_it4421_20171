import React, { Component } from 'react';
import PaperContainer from '../../components/PaperContainer';
import Typography from 'material-ui/Typography';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import { Button, Divider } from 'material-ui';
import { load, loadPage, deletePost } from '../../actions/post';
import Paginate from 'react-paginate';
import { Paper } from 'material-ui';
import NextIcon from 'material-ui-icons/KeyboardArrowRight';
import PrevIcon from 'material-ui-icons/KeyboardArrowLeft';
import { Link } from 'react-router-dom';
import moment from 'moment';
import Dialog, {
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
} from 'material-ui/Dialog';

const postStyles = {
	wrapper: {
		marginBottom: 10
	},
	button: {
		marginRight: 10
	},
	actionGroup: {
		marginTop: 10
	}
}

const Post = withStyles(postStyles)((props) => (
	<div className={props.classes.wrapper}>
		<PaperContainer>
			<Typography type="headline">
				{props.title}
			</Typography>
			<Typography type="body1">
				Vắn tắt: {props.description}
			</Typography>
			<Typography type="body1">
				Số người chết: {props.dead}
			</Typography>
			<Typography type="body1">
				Số người bị thương: {props.injured}
			</Typography>
			<Typography type="body1">
				Địa điểm: {props.place}
			</Typography>
			<Typography type="body1">
				Thời điểm: {props.time}
			</Typography>
			<Divider />
			<div className={props.classes.actionGroup}>
				<Link to={`/admin/edit/${props.id}`}>
					<Button
						raised
						color="primary"
						className={props.classes.button}
					>Edit</Button>
				</Link>
				<Button
					raised
					color="accent"
					onClick={props.onDelete}
				>Delete</Button>
			</div>
		</PaperContainer>
	</div>
));

const DeleteConfirmDialog = ({open, onRequestClose, onAccept, title}) => (
	<Dialog open={open} onRequestClose={onRequestClose}>
		<DialogTitle>{"Xóa ?"}</DialogTitle>
		<DialogContent>
			<DialogContentText>
				Bạn có chắc chắn muốn xóa {title}
			</DialogContentText>
		</DialogContent>
		<DialogActions>
			<Button onClick={onRequestClose} color="primary" autoFocus>
				Quay về
			</Button>
			<Button onClick={onAccept} raised color="accent">
				Xóa
			</Button>
		</DialogActions>
	</Dialog>
);

class PostList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			confirmDeleteId: 0,
			title: ''
		}
		this.handlePageChange = this.handlePageChange.bind(this);
		this.handleOnDelete = this.handleOnDelete.bind(this);
		this.confirmDelete = this.confirmDelete.bind(this);
	}

	componentDidMount() {
		this.props.load();
	}

	handlePageChange(e) {
		const page = e.selected + 1;
		this.props.loadPage(page);
	}

	handleOnDelete(id, title) {
		this.setState({ confirmDeleteId: id, title });
	}

	confirmDelete() {
		this.props.deletePost({
			_id: this.state.confirmDeleteId
		});
		this.setState({
			confirmDeleteId: 0
		});
	}

	render() {
		return (
			<div>
				{this.props.post.data.map(p => (
					<Post key={p._id}
						id={p._id}
						title={p.title}
						description={p.description}
						dead={p.dead}
						injured={p.injured}
						place={p.place.raw}
						time={moment(p.time).format('DD-MM-YYYY')}
						onDelete={() => this.handleOnDelete(p._id, p.title)}
					/>
				))}
				<Paper>
					<Paginate
						previousLabel={<PrevIcon />}
						nextLabel={<NextIcon />}
						breakLabel={<span>...</span>}
						breakClassName={"break-me"}
						pageCount={Math.ceil(this.props.post.meta.count / this.props.post.meta.pageSize)}
						marginPagesDisplayed={2}
						pageRangeDisplayed={5}
						forcePage={this.props.post.page - 1}
						onPageChange={this.handlePageChange}
						containerClassName={"pagination"}
						subContainerClassName={"pages pagination"}
						activeClassName={"active"}
					/>
				</Paper>
				<DeleteConfirmDialog
					open={this.state.confirmDeleteId !== 0}
					title={this.state.title}
					onRequestClose={() => this.setState({ confirmDeleteId: 0 })}
					onAccept={this.confirmDelete}
				/>
			</div>
		)
	}
}

export default connect(state => ({
	post: state.post
}), {
	load,
	loadPage,
	deletePost
})(PostList);
