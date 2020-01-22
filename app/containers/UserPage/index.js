/**
 *
 * UserPage
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { Card, message } from 'antd';
import UserTable from 'components/UserTable';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectUserPage from './selectors';
import reducer from './reducer';
import saga from './saga';
// import messages from './messages';
import { useHooks } from './hooks';

export function UserPage(props) {
  useInjectReducer({ key: 'userPage', reducer });
  useInjectSaga({ key: 'userPage', saga });

  const { dataSource, loading, error, alert, events } = useHooks(props);

  if (alert[0] !== '') {
    if (alert[0] === 'info') {
      message.info(alert[1]);
    } else {
      message.error(alert[1]);
    }
    events.resetAlert();
  }
  return (
    <Card loading={loading} error={error}>
      <UserTable
        dataSource={dataSource}
        onAdd={events.handleAdd()}
        onEdit={events.handleEdit()}
        onDelete={events.handleDelete()}
      />
    </Card>
  );
}

UserPage.propTypes = {
  // dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  userPage: makeSelectUserPage(),
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

export default compose(withConnect)(UserPage);
