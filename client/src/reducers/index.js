import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import post from './post';

export default combineReducers({
	router,
	post
});
