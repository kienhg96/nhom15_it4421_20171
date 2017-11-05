import { SET_ADMIN, SET_USER } from '../constants/actionTypes';

const DEFAULT_STATE = {
	user: null,
	admin: null
};

export default (state = DEFAULT_STATE, action) => {
	switch (action.type) {
		case SET_USER:
			return {
				...state,
				user: action.payload
			}
		case SET_ADMIN:
			return {
				...state,
				admin: action.payload
			}
		default:
			return state;
	}
}
