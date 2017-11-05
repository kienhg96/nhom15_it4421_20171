import handleSystemError from '../../configs/handleSystemError';
import deletePostAction from './deletePostAction';
import { showLoader, closeLoader, showSnack } from '../actionCenter';

export default info => async dispatch => {
	try {
		dispatch(showLoader());
		const response = await (await fetch('/api/post', {
			credentials: 'same-origin',
			method: 'DELETE',
			headers: new Headers({
				'Content-Type': 'application/json'
			}),
			body: JSON.stringify(info)
		})).json();
		dispatch(closeLoader());
		if (response.error) {
			return handleSystemError(response);
		}
		dispatch(deletePostAction(response.data));
		dispatch(showSnack('Đã xóa'));
	} catch (err) {
		handleSystemError(err);
	}
}
