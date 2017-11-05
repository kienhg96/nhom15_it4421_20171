import handleSystemError from '../../configs/handleSystemError';
import setPostMetaAction from './setPostMetaAction';
import { showLoader, closeLoader } from '../actionCenter';

export default () => async dispatch => {
	try {
		dispatch(showLoader());
		let response = await fetch('/api/post/meta', {
			credentials: 'same-origin'
		});
		response = await response.json();
		dispatch(closeLoader());
		dispatch(setPostMetaAction(response.data));
	} catch (err) {
		return handleSystemError(err);
	}
}
