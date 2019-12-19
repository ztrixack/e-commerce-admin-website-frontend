/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

// import messages from './messages';

import makeSelectUserProvider from 'containers/UserProvider/selectors';

import { Redirect } from 'react-router-dom';

export function HomePage({ user }) {
  if (user && user.isAuthenticated) {
    return <Redirect to={{ pathname: '/admin/dashboard' }} />;
  }

  return <Redirect to={{ pathname: '/login' }} />;
}

HomePage.propTypes = {
  user: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  user: makeSelectUserProvider(),
});

const withConnect = connect(mapStateToProps);

export default compose(withConnect)(HomePage);
