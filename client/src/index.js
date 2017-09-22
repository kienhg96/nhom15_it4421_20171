import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import store from './configs/store';
import { Provider } from 'react-redux';
import App from './containers/App';
import 'typeface-roboto';
import { MuiThemeProvider } from 'material-ui/styles';
import theme from './configs/theme';

ReactDOM.render(
	<Provider store={store}>
		<MuiThemeProvider theme={theme}>
			<App />
		</MuiThemeProvider>
	</Provider>
,document.getElementById('root'));
registerServiceWorker();
