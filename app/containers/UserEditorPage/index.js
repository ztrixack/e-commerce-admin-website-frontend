/**
 *
 * UserEditorPage
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { Layout, Menu } from 'antd';

import UserSettingEditor from 'components/UserSettingEditor';
import UserInformationEditor from 'components/UserInformationEditor';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectUserEditorPage from './selectors';
import reducer from './reducer';
import saga from './saga';
// import messages from './messages';
import { useHooks } from './hooks';

const { Content, Sider } = Layout;

const getContent = (key, user) => {
  switch (key) {
    case 0:
      return <UserSettingEditor user={user} />;

    case 1:
      return <UserInformationEditor user={user} />;

    default:
      return 'null';
  }
};

export function UserEditorPage(props) {
  useInjectReducer({ key: 'userEditorPage', reducer });
  useInjectSaga({ key: 'userEditorPage', saga });

  const { loading, selected, user, events } = useHooks(props);
  const content = getContent(selected, user);

  return (
    <Layout
      style={{ padding: '24px 0', background: '#fff' }}
      loading={loading.toString()}
    >
      <Sider width={200} style={{ background: '#fff' }}>
        <Menu
          onClick={events.handleMenuClick()}
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

UserEditorPage.propTypes = {
  // dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  userEditorPage: makeSelectUserEditorPage(),
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

export default compose(withConnect)(UserEditorPage);
