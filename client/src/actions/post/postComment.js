import handleSystemError from '../../configs/handleSystemError';
import { showLoader, closeLoader, showSnack } from '../actionCenter';
import addCommentAction from './addCommentAction';

export default (_id, comment) => dispatch => {
	return new Promise(resolve => {
		dispatch(showLoader());
		fetch('/api/post/comment', {
			method: 'POST',
			credentials: 'same-origin',
			headers: new Headers({
				'Content-Type': 'application/json'
			}),
			body: JSON.stringify({ comment, _id })
		})
		.then(response => response.json())
		.then(response => {
			dispatch(closeLoader());
			if (response.error) {
				switch (response.error) {
					case 'POST_NOT_FOUND':
						return dispatch(showSnack('Bài đăng đã bị xóa trong lúc bình luận'));
					default:
						return handleSystemError(response.error);
				}
			}
			dispatch(addCommentAction(_id, response.data));
			return resolve(response.data);
		})
		.catch(handleSystemError);
	});
}
