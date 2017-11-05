import handleSystemError from '../../configs/handleSystemError';
import setAdminAction from './setAdminAction';
import setUserAction from './setUserAction';

const loadUser = () => new Promise((resolve, reject) => {
	fetch('/api/user/info', {
		credentials: 'same-origin'
	})
	.then(response => response.json())
	.then(response => {
		return resolve(response.data);
	})
	.catch(reject);
});

const loadAdmin = () => new Promise((resolve, reject) => {
	fetch('/api/admin/info', {
		credentials: 'same-origin'
	})
	.then(response => response.json())
	.then(response => {
		return resolve(response.data);
	})
	.catch(reject);
});

export default (callback) => dispatch => {
	let loadedCount = 0;
	loadUser().then((user) => {
		loadedCount++;
		if (user) {
			dispatch(setUserAction(user))
		}
		if (loadedCount === 2) {
			callback();
		}
	}).catch(handleSystemError);

	loadAdmin().then((admin) => {
		loadedCount++;
		if (admin) {
			dispatch(setAdminAction(admin));
		}
		if (loadedCount === 2) {
			callback();
		}
	}).catch(handleSystemError)
}
