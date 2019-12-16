/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { Switch, Route, withRouter } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router/immutable';

import HomePage from 'containers/HomePage/Loadable';
import LoginPage from 'containers/LoginPage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';

import GlobalStyle from '../../global-styles';

export function App(props) {
  return (
    <ConnectedRouter history={props.history}>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/login" component={LoginPage} />
        <Route component={NotFoundPage} />
      </Switch>
      <GlobalStyle />
    </ConnectedRouter>
  );
}

App.propTypes = {
  history: PropTypes.object,
};

export default compose(withRouter)(App);
