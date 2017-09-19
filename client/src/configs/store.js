import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';
import reducers from '../reducers';
import history from './history';
import build from './build';

const router = routerMiddleware(history);
let store;

if (build) {
	store = createStore(reducers, {}, applyMiddleware(thunk, router));
} else {
	const composeEnhancers =
			window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
	store = createStore(reducers, {}, 
			composeEnhancers(applyMiddleware(thunk, router)));
}

export default store;
