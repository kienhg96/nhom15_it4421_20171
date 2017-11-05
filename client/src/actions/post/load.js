import loadPage from './loadPage';
import loadMeta from './loadMeta';
import { setLoaded } from '../loaded';

export default () => (dispatch, getState) => {
	const { posts } = getState().loaded;
	if (!posts) {
		dispatch(setLoaded('posts'));
		dispatch(loadPage(1));
		dispatch(loadMeta());
	}
}
