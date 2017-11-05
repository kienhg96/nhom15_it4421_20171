import handleSystemError from '../../configs/handleSystemError';
import { showLoader, closeLoader, showSnack } from '../actionCenter';
import setUserAction from './setUserAction';

export default () => dispatch => {
	dispatch(showLoader());
	fetch('/api/user/logout', {
		credentials: 'same-origin'
	})
	.then(response => response.json())
	.then(response => {
		dispatch(closeLoader());
		dispatch(setUserAction(null));
		dispatch(showSnack('Đã đăng xuất'));
	})
	.catch(handleSystemError);
}
