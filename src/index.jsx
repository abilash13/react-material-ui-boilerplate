/**
 * This is the entry file for the application, only setup and boilerplate code.
 */

import '@babel/polyfill'; // Needed for redux-saga es6 generator support
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { JssProvider, jss } from 'react-jss';
import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import store from 'store';
import theme from 'theme';
import App from 'App';
import history from 'browserHistory';

if (process.env.NODE_ENV === 'development') {
  require('webpack-serve-overlay'); // eslint-disable-line global-require
}

const Root = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <JssProvider jss={jss}>
        <MuiThemeProvider theme={theme}>
          <CssBaseline />
          <App />
        </MuiThemeProvider>
      </JssProvider>
    </ConnectedRouter>
  </Provider>
);

const MOUNT_NODE = document.getElementById('root');
render(<Root />, MOUNT_NODE);
