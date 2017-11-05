import handleSystemError from '../../configs/handleSystemError';
import setPostsAction from './setPostsAction';
import setPostPageAction from './setPostPageAction';
import { showLoader, closeLoader } from '../actionCenter';
import parsePost from './parsePost';

export default (page) => async (dispatch, getState) => {
	try {
		dispatch(setPostPageAction(page));
		dispatch(showLoader());
		let response = await fetch(`/api/post?page=${page}`, {
			credentials: 'same-origin'
		});
		response = await response.json();
		if (response.error) {
			return handleSystemError(response);
		}
		dispatch(closeLoader());
		dispatch(setPostsAction(parsePost(response.data)));
	} catch (err) {
		return handleSystemError(err);
	}
}
