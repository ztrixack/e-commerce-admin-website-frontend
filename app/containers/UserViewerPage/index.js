/**
 *
 * UserViewerPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectUserViewerPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

export function UserViewerPage() {
  useInjectReducer({ key: 'userViewerPage', reducer });
  useInjectSaga({ key: 'userViewerPage', saga });

  return (
    <div>
      <FormattedMessage {...messages.header} />
    </div>
  );
}

UserViewerPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  userViewerPage: makeSelectUserViewerPage(),
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

export default compose(withConnect)(UserViewerPage);
