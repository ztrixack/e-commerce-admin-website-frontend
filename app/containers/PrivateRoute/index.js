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

import Loading from 'components/Loading';
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

  const { component: Component, user, requiredRole, ...rest } = props;

  if (user.loading) {
    return <Loading />;
  }

  if (!user.isAuthenticated) {
    return <Redirect to={{ pathname: '/forbidden' }} />;
  }

  if (requiredRole) {
    if (!user.data) {
      return <Redirect to={{ pathname: '/forbidden' }} />;
    }

    const userRoles = user.data.roles;
    const isInRole = requiredRole.some(role => userRoles.includes(role));

    if (!isInRole) {
      return <Redirect to={{ pathname: '/forbidden' }} />;
    }
  }

  return <Route component={Component} {...rest} />;
}

PrivateRoute.propTypes = {
  dispatch: PropTypes.func.isRequired,
  component: PropTypes.any.isRequired,
  location: PropTypes.object.isRequired,
  requiredRole: PropTypes.arrayOf(PropTypes.string),
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
