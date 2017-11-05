import { SHOW_LOADER } from '../../constants/actionTypes';

export default (force = false) => ({
	type: SHOW_LOADER,
	force
});
