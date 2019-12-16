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

import { Alert, Icon, Checkbox, Form } from 'antd';
import { Redirect } from 'react-router-dom';

import makeSelectUserProvider from 'containers/UserProvider/selectors';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectLoginPage from './selectors';
import reducer from './reducer';
import saga from './saga';
// import messages from './messages';

import { useHooks } from './hooks';
import {
  LoginWarp,
  LoginForm,
  LoginFormInput,
  LoginFormForgot,
  LoginFormButton,
} from './styles';

export function LoginPage(props) {
  useInjectReducer({ key: 'loginPage', reducer });
  useInjectSaga({ key: 'loginPage', saga });

  const { getFieldDecorator } = props.form;
  const { notice, isAuthenticated, event } = useHooks(props);

  if (isAuthenticated) {
    return <Redirect to={{ pathname: '/dashboard' }} />;
  }

  return (
    <LoginWarp>
      <LoginForm onSubmit={event.onLogin()}>
        {notice && (
          <Alert
            style={{ marginBottom: 24 }}
            message={notice}
            type="error"
            showIcon
            closable
          />
        )}
        <Form.Item>
          {getFieldDecorator('username', {
            rules: [
              {
                required: true,
                message: 'Please input your username!',
              },
            ],
          })(
            <LoginFormInput
              prefix={<Icon type="user" />}
              placeholder="Username"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [
              {
                required: true,
                message: 'Please input your Password!',
              },
            ],
          })(
            <LoginFormInput
              prefix={<Icon type="lock" />}
              type="password"
              placeholder="Password"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(<Checkbox>Remember me</Checkbox>)}
          <LoginFormForgot>Forgot password</LoginFormForgot>
          <LoginFormButton type="primary" htmlType="submit">
            Log in
          </LoginFormButton>
        </Form.Item>
      </LoginForm>
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
