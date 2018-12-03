import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import appConfig from 'store/AppConfig/reducers';
import home from 'store/Home/reducers';
import history from 'browserHistory';

const rootReducer = combineReducers({ router: connectRouter(history), appConfig, home });

export default rootReducer;
