import React, { Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';
import { hot } from 'react-hot-loader';
import HomePage from 'routes/Home';
// import NotFoundPage from 'routes/404';

const App = () => (
  <Fragment>
    <div>
      <Switch>
        <Route exact path="/" component={HomePage} />
        {/* <Route path="/error" component={NotFoundPage} /> */}
      </Switch>
    </div>
  </Fragment>
);

export default hot(module)(App);
