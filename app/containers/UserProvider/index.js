/**
 *
 * UserProvider
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import Loading from 'components/Loading';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';

import { getUser } from './actions';
import makeSelectUserProvider from './selectors';
import reducer from './reducer';
import saga from './saga';
// import messages from './messages';

export function UserProvider(props) {
  useInjectReducer({ key: 'userProvider', reducer });
  useInjectSaga({ key: 'userProvider', saga });

  const { dispatch, user } = props;

  React.useEffect(() => {
    if (user.isAuthenticated) {
      dispatch(getUser());
    }
  }, [dispatch, user.isAuthenticated]);

  return (
    <Loading loading={props.user.loading}>
      {React.Children.only(props.children)}
    </Loading>
  );
}

UserProvider.propTypes = {
  dispatch: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
  user: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
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

const Provider = compose(withConnect)(UserProvider);

export function withUser(Component) {
  return props => (
    <Provider>
      <Component {...props} />
    </Provider>
  );
}

export default Provider;
