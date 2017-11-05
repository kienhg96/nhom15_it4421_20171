import handleSystemError from '../../configs/handleSystemError';
import { showLoader, closeLoader, showSnack } from '../actionCenter';
import setAdminAction from './setAdminAction';
import { push } from 'react-router-redux';

export default () => dispatch => {
	dispatch(showLoader());
	fetch('/api/admin/logout', {
		credentials: 'same-origin'
	})
	.then(response => response.json())
	.then(response => {
		dispatch(closeLoader());
		dispatch(setAdminAction(null));
		dispatch(push('/admin/login'));
		dispatch(showSnack('Đã đăng xuất'));
	})
	.catch(handleSystemError);
}
