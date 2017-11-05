import updatePostAction from './updatePostAction';
import _ from 'lodash';
import handleSystemError from '../../configs/handleSystemError';
import { showLoader, closeLoader, showSnack } from '../actionCenter';
import difference from '../../utils/difference';

export default info => async (dispatch, getState) => {
	try {
		const data = _.pick(info, 
			['_id', 'title', 'description', 
			'content', 'time', 'place', 'dead', 'injured']);
		let diff = getState().post.data.find(p => p._id === data._id);
		if (!diff) {
			diff = data;
		} else {
			diff.place = diff.place.raw;
			diff = difference(data, diff);
			diff._id = data._id;
		}
		dispatch(showLoader());
		let response = await fetch('/api/post', {
			credentials: 'same-origin',
			method: 'PUT',
			headers: new Headers({
				'Content-Type': 'application/json'
			}),
			body: JSON.stringify(diff)
		});
		response = await response.json();
		if (response.error) {
			return handleSystemError(response);
		}
		dispatch(closeLoader());
		dispatch(showSnack('Cập nhật thành công'));
		dispatch(updatePostAction(diff));
	} catch (err) {
		handleSystemError(err);
	}
}
