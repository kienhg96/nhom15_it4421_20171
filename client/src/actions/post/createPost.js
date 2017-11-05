import handleSystemError from '../../configs/handleSystemError';
import addPostAction from './addPostAction';
import { push } from 'react-router-redux';
import { showLoader, closeLoader, showSnack } from '../actionCenter';

export default info => async dispatch => {
	try {
		dispatch(showLoader());
		const response = await (await fetch('/api/post', {
			credentials: 'same-origin',
			method: 'POST',
			headers: new Headers({
				'Content-Type': 'application/json'
			}),
			body: JSON.stringify(info)
		})).json();
		dispatch(closeLoader());
		if (response.error) {
			return handleSystemError(response);
		}
		dispatch(addPostAction(response.data));
		dispatch(showSnack('Tạo thành công'));
		dispatch(push('/admin/postlist'));
	} catch (err) {
		handleSystemError(err);
	}
}
