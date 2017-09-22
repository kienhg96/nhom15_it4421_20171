import handleSystemError from '../../configs/handleSystemError';
import setPostsAction from './setPostsAction';
import setPostMetaAction from './setPostMetaAction';

export default (page = 1) => async (dispatch, getState) => {
	try {
		const { data } = getState().post;
		let response;
		if (data.length === 0) {
			response = await fetch('/api/post/meta', {
				credentials: 'same-origin'
			});
			response = await response.json();
			dispatch(setPostMetaAction(response.data));
		}
		response = await fetch(`/api/post?page=${page}`, {
			credentials: 'same-origin'
		});
		response = await response.json();
		if (response.error) {
			return console.error(response);
		}
		dispatch(setPostsAction(response.data));
	} catch (err) {
		return handleSystemError(err);
	}
}
