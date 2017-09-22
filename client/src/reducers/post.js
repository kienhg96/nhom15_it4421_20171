import {
	SET_POST_META,
	SET_POST_PAGE,
	SET_POSTS
} from '../constants/actionTypes';
const DEFAULT_STATE = {
	data: [],
	meta: {
		pageSize: 20,
		count: 0
	},
	page: 1
}

export default (state = DEFAULT_STATE, action) => {
	switch (action.type) {
		case SET_POST_META:
			return {
				...state,
				meta: action.payload
			}
		case SET_POST_PAGE:
			return {
				...state,
				page: action.payload
			}
		case SET_POSTS:
			return {
				...state,
				data: action.payload
			}
		default: 
			return state;
	}
}
