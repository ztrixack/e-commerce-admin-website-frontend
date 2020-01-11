/**
 *
 * PrivateRoute
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { Route, Redirect } from 'react-router-dom';

import makeSelectUserProvider from 'containers/UserProvider/selectors';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectPrivateRoute from './selectors';
import reducer from './reducer';
import saga from './saga';
// import messages from './messages';

export function PrivateRoute(props) {
  useInjectReducer({ key: 'privateRoute', reducer });
  useInjectSaga({ key: 'privateRoute', saga });

  const { component: Component, ...rest } = props;

  if (!(props.user && props.user.isAuthenticated)) {
    return <Redirect to={{ pathname: '/forbidden' }} />;
  }

  return <Route component={Component} {...rest} />;
}

PrivateRoute.propTypes = {
  dispatch: PropTypes.func.isRequired,
  component: PropTypes.any.isRequired,
  location: PropTypes.object.isRequired,
  user: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  privateRoute: makeSelectPrivateRoute(),
  user: makeSelectUserProvider(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(PrivateRoute);
