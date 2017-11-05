import {
	SET_POST_META,
	SET_POST_PAGE,
	SET_POSTS,
	ADD_POST,
	UPDATE_POST,
	DELETE_POST,
	ADD_COMMENT
} from '../constants/actionTypes';
const DEFAULT_STATE = {
	data: [],
	meta: {
		pageSize: 20,
		count: 0
	},
	page: 1
}

const post = (state, action) => {
	switch (action.type) {
		case UPDATE_POST:
			if (state._id === action.payload._id) {
				return {
					...state,
					...action.payload
				}
			}
			return state;
		case ADD_COMMENT:
			if (state._id === action.payload._id) {
				return {
					...state,
					comments: [...state.comments, action.payload.comment]
				}
			}
			return state;
		default:
			return state;
	}
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
		case ADD_POST:
			return {
				...state,
				data: [action.payload, ...state.data]
			}
		case UPDATE_POST:
		case ADD_COMMENT:
			return {
				...state,
				data: state.data.map(p => post(p, action))
			}
		case DELETE_POST: {
			return {
				...state,
				data: state.data.filter(p => p._id !== action.payload)
			}
		}
		default: 
			return state;
	}
}
