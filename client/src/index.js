import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import store from './configs/store';
import { Provider } from 'react-redux';
import App from './containers/App';
import 'typeface-roboto';

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>
,document.getElementById('root'));
registerServiceWorker();
