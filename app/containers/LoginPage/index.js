/**
 *
 * LoginPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { Alert, Icon, Form } from 'antd';
import { Redirect } from 'react-router-dom';

import makeSelectUserProvider from 'containers/UserProvider/selectors';
import logoImage from 'assets/svg/logo.svg';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectLoginPage from './selectors';
import reducer from './reducer';
import saga from './saga';
// import messages from './messages';

import { useHooks } from './hooks';
import {
  LoginWarp,
  LoginLogo,
  LoginLogoImage,
  LoginLogoSpan,
  LoginFormInput,
  LoginFormButton,
  LoginAdmin,
  LoginGuest,
} from './styles';

export function LoginPage(props) {
  useInjectReducer({ key: 'loginPage', reducer });
  useInjectSaga({ key: 'loginPage', saga });

  const { getFieldDecorator } = props.form;
  const { notice, isAuthenticated, loading, events } = useHooks(props);

  if (isAuthenticated) {
    return <Redirect to={{ pathname: '/' }} />;
  }

  return (
    <LoginWarp>
      <LoginLogo>
        <LoginLogoImage alt="logo" src={logoImage} />
        <LoginLogoSpan>Admin Panel</LoginLogoSpan>
      </LoginLogo>
      <Form onSubmit={events.onLogin()}>
        <Form.Item>
          {getFieldDecorator('username', {
            rules: [
              {
                required: true,
                message: 'username is required!',
              },
            ],
          })(
            <LoginFormInput
              prefix={<Icon type="user" />}
              onPressEnter={events.onLogin()}
              placeholder="Username"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [
              {
                required: true,
                message: 'password is required!',
              },
            ],
          })(
            <LoginFormInput
              prefix={<Icon type="lock" />}
              onPressEnter={events.onLogin()}
              type="password"
              placeholder="Password"
            />,
          )}
        </Form.Item>
        {notice && (
          <Alert
            style={{ marginBottom: 24 }}
            message={notice}
            type="error"
            showIcon
            closable
          />
        )}
        <LoginFormButton type="primary" htmlType="submit" loading={loading}>
          Sign in
        </LoginFormButton>
        <LoginAdmin>
          <span>Username：admin</span>
          <span>Password：admin</span>
        </LoginAdmin>
        <LoginGuest>
          <span>Username：staff</span>
          <span>Password：staff</span>
        </LoginGuest>
      </Form>
    </LoginWarp>
  );
}

LoginPage.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  form: PropTypes.object.isRequired,
  // user: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  loginPage: makeSelectLoginPage(),
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

const withForm = Form.create({ name: 'loginPage' });

export default compose(
  withConnect,
  withForm,
)(LoginPage);
