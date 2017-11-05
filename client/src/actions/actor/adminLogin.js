import handleSystemError from '../../configs/handleSystemError';
import { showLoader, closeLoader, showSnack } from '../actionCenter';
import setAdminAction from './setAdminAction';
import { push } from 'react-router-redux';

export default ({ username, password }) => dispatch => {
	dispatch(showLoader());
	fetch('/api/admin/login', {
		method: 'POST',
		credentials: 'same-origin',
		headers: new Headers({
			'Content-Type': 'application/json'
		}),
		body: JSON.stringify({ username, password })
	})
	.then(response => response.json())
	.then(response => {
		dispatch(closeLoader());
		if (response.error) {
			switch (response.error) {
				case 'ADMIN_NOT_FOUND':
					return dispatch(showSnack('Tên người dùng không đúng'));
				case 'PASSWORD_MISMATCH':
					return dispatch(showSnack('Mật khẩu không đúng'));
				default:
					return handleSystemError(response.error);
			}
		}
		dispatch(setAdminAction(response.data));
		dispatch(showSnack(`Xin chào, ${response.data.firstName || ''}`));
		dispatch(push('/admin'));
	})
	.catch(handleSystemError);
}
