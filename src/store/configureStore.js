/**
 * Create the store with dynamic reducers
 */

import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import createSagaMiddleware from 'redux-saga';
import reduxLogger from 'redux-logger';

import rootReducer from 'store/reducer';
import rootSaga from 'store/saga';
import history from 'browserHistory';

const configureStore = (initialState = {}) => {
  const sagaMiddleware = createSagaMiddleware();

  // Create the store with two middlewares
  // 1. sagaMiddleware: Makes redux-sagas work
  // 2. routerMiddleware: Syncs the location/URL path to the state
  const middlewares = [sagaMiddleware, routerMiddleware(history), reduxLogger];

  const enhancers = [applyMiddleware(...middlewares)];

  // If Redux DevTools Extension is installed use it, otherwise use Redux compose
  /* eslint-disable no-underscore-dangle */
  const composeEnhancers =
    typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
          shouldHotReload: false,
        })
      : compose;
  /* eslint-enable */

  // Instantiate the Store
  const store = createStore(rootReducer, initialState, composeEnhancers(...enhancers));
  sagaMiddleware.run(rootSaga);
  // Extensions
  // store.runSaga = sagaMiddleware.run;
  // store.injectedReducers = {}; // Reducer registry
  // store.injectedSagas = {}; // Saga registry

  // Make reducers hot reloadable
  if (module.hot) {
    module.hot.accept('./reducer', () => {
      const nextRootReducer = require('./reducer'); // eslint-disable-line global-require
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
};

export default configureStore;
