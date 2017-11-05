import { ADD_POST } from '../../constants/actionTypes';

export default (post) => ({
	type: ADD_POST,
	payload: post
});
