import handleSystemError from '../../configs/handleSystemError';
import { showLoader, closeLoader } from '../actionCenter';
import parsePost from './parsePost';

export default id => async (dispatch, getState) => {
	try {
		const post = getState().post.data.find(p => p._id === id);
		if (post) {
			return post;
		}
		dispatch(showLoader());
		let response = await fetch(`/api/post?_id=${id}`, {
			credentials: 'same-origin'
		});
		response = await response.json();
		if (response.error) {
			handleSystemError(response);
			return null;
		}
		dispatch(closeLoader());
		return parsePost(response.data);
	} catch (err) {
		handleSystemError(err);
		return null;
	}
}
