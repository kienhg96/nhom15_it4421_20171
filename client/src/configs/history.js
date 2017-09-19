import createBrowserHistory from 'history/createBrowserHistory';
import createHashHistory from 'history/createHashHistory';
import build from './build';

const history = build ? createBrowserHistory() : createHashHistory();

export default history;
