import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import post from './post';
import actionCenter from './actionCenter';
import loaded from './loaded';
import actor from './actor';
import search from './search';

export default combineReducers({
	router,
	post,
	actionCenter,
	loaded,
	actor,
	search
});
