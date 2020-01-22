/**
 *
 * UserCreatorPage
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { Layout, Menu } from 'antd';

import UserSettingCreator from 'components/UserSettingCreator';
import UserInformationCreator from 'components/UserInformationCreator';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectUserCreatorPage from './selectors';
import reducer from './reducer';
import saga from './saga';
// import messages from './messages';
import { useHooks } from './hooks';

const { Content, Sider } = Layout;

const getContent = (key, events) => {
  switch (key) {
    case 0:
      return <UserSettingCreator onNext={events.handleNext()} />;

    case 1:
      return (
        <UserInformationCreator
          onPrevious={events.handlePrevious()}
          onComplete={events.handleComplete()}
        />
      );

    default:
      return 'null';
  }
};

export function UserCreatorPage(props) {
  useInjectReducer({ key: 'userCreatorPage', reducer });
  useInjectSaga({ key: 'userCreatorPage', saga });

  const { selected, alert, events } = useHooks(props);

  const content = getContent(selected, events);
  alert.call();

  return (
    <Layout style={{ padding: '24px 0', background: '#fff' }}>
      <Sider width={200} style={{ background: '#fff' }}>
        <Menu
          defaultSelectedKeys={['0']}
          selectedKeys={[String(selected)]}
          mode="inline"
          style={{ height: '100%' }}
        >
          <Menu.Item key="0">
            <span>Account Settings</span>
          </Menu.Item>
          <Menu.Item key="1">
            <span>Personal Information</span>
          </Menu.Item>
        </Menu>
      </Sider>
      <Content style={{ padding: '0 24px', minHeight: 512 }}>{content}</Content>
    </Layout>
  );
}

UserCreatorPage.propTypes = {
  // dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  userCreatorPage: makeSelectUserCreatorPage(),
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

export default compose(withConnect)(UserCreatorPage);
