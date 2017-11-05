import { combineReducers } from 'redux';
import {
	SHOW_SNACK, CLOSE_SNACK,
	SHOW_LOADER, CLOSE_LOADER,
} from '../constants/actionTypes';

const snack = (state = { show: false, message: '' }, action) => {
	switch (action.type) {
		case SHOW_SNACK:
			return {
				show: true,
				message: action.payload
			}
		case CLOSE_SNACK:
			return {
				...state,
				show: false
			}
		default:
			return state;
	}
}

const loader = (state = 0, action) => {
	switch (action.type) {
		case SHOW_LOADER:
			return state + 1;
		case CLOSE_LOADER:
			if (action.force) {
				return 0;
			}
			return state - 1 < 0 ? 0 : state - 1;
		default:
			return state;
	}
}

export default combineReducers({
	snack,
	loader
});
