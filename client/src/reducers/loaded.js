import { SET_LOADED } from '../constants/actionTypes';
const DEFAULT_STATE = {
	posts: false
};

export default (state = DEFAULT_STATE, action) => {
	switch (action.type) {
		case SET_LOADED:
			return {
				...state,
				[action.payload]: true
			}
		default:
			return state;
	}
}