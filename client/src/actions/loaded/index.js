import { SET_LOADED } from '../../constants/actionTypes';

export const setLoaded = field => ({
	type: SET_LOADED,
	payload: field
});
