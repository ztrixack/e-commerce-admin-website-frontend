/**
 *
 * StaffLayout
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { Layout, Menu, Avatar, PageHeader, Button } from 'antd';
import { withRouter } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router/immutable';

import makeSelectUserProvider from 'containers/UserProvider/selectors';

import { RouterGen, BreadcrumbGen, MenuGen } from 'utils/routes';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectStaffLayout from './selectors';
import reducer from './reducer';
import saga from './saga';
// import messages from './messages';

import routes from './routes';
import { useHooks } from './hooks';

export function StaffLayout(props) {
  useInjectReducer({ key: 'staffLayout', reducer });
  useInjectSaga({ key: 'staffLayout', saga });

  const currentPath = props.location.pathname;
  const { staff, collapse, events } = useHooks(props);

  return (
    <ConnectedRouter history={props.history}>
      <Layout style={{ minHeight: '100vh' }}>
        <PageHeader
          style={{ backgroundColor: 'white', padding: 16 }}
          onBack={() => window.history.back()}
          title={<span>E-Commerce Staff</span>}
          extra={[
            <Button
              key="logout"
              type="link"
              icon="logout"
              size="small"
              onClick={events.onLogout()}
            />,
            <Avatar key="avatar" src={staff.avatar}>
              {staff.username[0].toUpperCase()}
            </Avatar>,
          ]}
        />
        <Layout>
          <Layout.Sider
            theme="light"
            breakpoint="sm"
            collapsible
            collapsed={collapse}
            onCollapse={events.onCollapse()}
          >
            <Menu
              theme="light"
              mode="inline"
              defaultSelectedKeys={[currentPath]}
              defaultOpenKeys={[currentPath]}
            >
              {MenuGen(props.match.url, routes)}
            </Menu>
          </Layout.Sider>
          <Layout>
            <Layout.Content style={{ margin: '0 16px' }}>
              {BreadcrumbGen(props.match.url, routes)}
              {RouterGen(props.match.url, routes, '')}
            </Layout.Content>
            <Layout.Footer style={{ textAlign: 'center' }}>
              e-commerce staff © 2019
            </Layout.Footer>
          </Layout>
        </Layout>
      </Layout>
    </ConnectedRouter>
  );
}

StaffLayout.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  // user: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  staffLayout: makeSelectStaffLayout(),
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

export default compose(
  withConnect,
  withRouter,
)(StaffLayout);
