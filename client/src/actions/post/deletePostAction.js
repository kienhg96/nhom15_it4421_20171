import { DELETE_POST } from '../../constants/actionTypes';

export default ({ _id }) => ({
	type: DELETE_POST,
	payload: _id
});
