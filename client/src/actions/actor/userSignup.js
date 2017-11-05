import handleSystemError from '../../configs/handleSystemError';
import { showLoader, closeLoader, showSnack } from '../actionCenter';
import { push } from 'react-router-redux';
import setUserAction from './setUserAction';

export default ({ username, password, birthday, email, firstName, lastName, address}) => dispatch => {
	dispatch(showLoader());
	fetch('/api/user/signup', {
		method: 'POST',
		credentials: 'same-origin',
		headers: new Headers({
			'Content-Type': 'application/json'
		}),
		body: JSON.stringify({
			username,
			password,
			ngaySinh: birthday,
			email,
			firstName,
			lastName,
			address
		})
	})
	.then(response => response.json())
	.then(response => {
		dispatch(closeLoader());
		if (response.error) {
			switch (response.error) {
				case 'USER_EXISTS':
					return dispatch(showSnack('Tên người dùng đã tồn tại'));
				default:
					return handleSystemError(response.error);
			}
		}
		dispatch(setUserAction(response.data));
		dispatch(showSnack('Đăng ký thành công'));
		dispatch(push('/'));
	})
	.catch(handleSystemError);
}
