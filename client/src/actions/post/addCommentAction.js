import { ADD_COMMENT } from '../../constants/actionTypes';

export default (_id, comment) => ({
	type: ADD_COMMENT,
	payload: {
		_id, comment
	}
});
