import loadPage from './loadPage';

export default () => (dispatch, getState) => {
	const { page, meta } = getState().post;
	if (page < Math.ceil(meta.count / meta.pageSize)) {
		dispatch(loadPage(page + 1));
	}
}
