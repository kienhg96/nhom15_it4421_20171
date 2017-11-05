import {
	SET_SEARCH_QUERY,
	SET_SEARCH_DATA,
	SET_SEARCH_PAGE,
	SET_SEARCH_META
} from '../constants/actionTypes';

const DEFAULT_STATE = {
	data: [],
	meta: {
		pageSize: 20,
		count: 0
	},
	page: 1,
	query: ''
}

export default (state = DEFAULT_STATE, action) => {
	switch (action.type) {
		case SET_SEARCH_META:
			return {
				...state,
				meta: action.payload
			}
		case SET_SEARCH_DATA:
			return {
				...state,
				data: action.payload
			}
		case SET_SEARCH_PAGE:
			return {
				...state,
				page: action.payload
			}
		case SET_SEARCH_QUERY:
			return {
				...state,
				query: action.payload
			}
		default:
			return state;
	}
}
