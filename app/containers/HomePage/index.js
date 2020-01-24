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

import Loading from 'components/Loading';
import makeSelectUserProvider from 'containers/UserProvider/selectors';

// import messages from './messages';

import { Redirect } from 'react-router-dom';

export function HomePage({ user }) {
  if (user.loading) {
    return <Loading />;
  }

  if (user.isAuthenticated) {
    if (user.data.roles && user.data.roles.length > 0) {
      const highestRole = user.data.roles[0];
      return <Redirect to={{ pathname: `/${highestRole}/dashboard` }} />;
    }

    return <Redirect to={{ pathname: `/staff` }} />;
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
