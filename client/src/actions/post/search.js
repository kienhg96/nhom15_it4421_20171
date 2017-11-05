import handleSystemError from '../../configs/handleSystemError';
import { showLoader, closeLoader } from '../actionCenter';
import {
	SET_SEARCH_QUERY,
	SET_SEARCH_DATA,
	SET_SEARCH_PAGE,
	SET_SEARCH_META
} from '../../constants/actionTypes';

const setSearchMetaAction = meta => ({
	type: SET_SEARCH_META,
	payload: meta
});

const setSearchDataAction = data => ({
	type: SET_SEARCH_DATA,
	payload: data
});

const setSearchPageAction = page => ({
	type: SET_SEARCH_PAGE,
	payload: page
});

const setSearchQueryAction = query => ({
	type: SET_SEARCH_QUERY,
	payload: query
});

export const loadSearchMeta = query => dispatch => {
	dispatch(showLoader());
	fetch(`/api/post/searchMeta?q=${query}`, {
		credentials: 'same-origin'
	})
	.then(response => response.json())
	.then(response => {
		dispatch(closeLoader());
		if (response.error) {
			return handleSystemError(response.error);
		}
		dispatch(setSearchMetaAction(response.data));
	})
	.catch(handleSystemError);
}

export default (query, page = 1) => (dispatch, getState) => {
	const { search } = getState();
	const lstQuery = search.query;
	const lstPage = search.page;
	if (lstQuery !== query) {
		dispatch(setSearchQueryAction(query));
		dispatch(loadSearchMeta(query));
	}
	if (lstQuery !== query || lstPage !== page) {
		dispatch(setSearchPageAction(page));
		dispatch(showLoader());
		fetch(`/api/post/search?q=${query}&page=${page}`, {
			credentials: 'same-origin'
		})
		.then(response => response.json())
		.then(response => {
			dispatch(closeLoader());
			if (response.error) {
				return handleSystemError(response.error);
			}
			dispatch(setSearchDataAction(response.data));
		})
		.catch(handleSystemError)
	}
}
