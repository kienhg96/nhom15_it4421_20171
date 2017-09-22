import { SET_POSTS } from '../../constants/actionTypes';

export default (posts) => ({
	type: SET_POSTS,
	payload: posts
});