/**
 *
 * UserSettingCreator
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { Form, Input, Button } from 'antd';

// import { FormattedMessage } from 'react-intl';
// import messages from './messages';
import { useHooks } from './hooks';

const { Password } = Input;

function UserSettingCreator(props) {
  const { form } = props;
  const { alert, submitting, events } = useHooks(props);
  alert.call();

  return (
    <Form
      layout="vertical"
      style={{ maxWidth: 300 }}
      onSubmit={events.handleSubmit()}
    >
      <Form.Item label="Username">
        {form.getFieldDecorator('username', {
          validateTrigger: 'onBlur',
          rules: [
            { required: true, message: 'Please input your username!' },
            {
              validator: events.handleValidateToUsername(),
            },
          ],
        })(<Input placeholder="jane" />)}
      </Form.Item>
      <Form.Item label="Password" hasFeedback>
        {form.getFieldDecorator('password', {
          rules: [
            {
              required: true,
              message: 'Please input your password!',
            },
            {
              validator: events.handleValidateToNextPassword(),
            },
          ],
        })(<Password type="password" />)}
      </Form.Item>
      <Form.Item label="Confirm Password">
        {form.getFieldDecorator('repassword', {
          rules: [
            {
              required: true,
              message: 'Please confirm your password!',
            },
            {
              validator: events.handleCompareToFirstPassword(),
            },
          ],
        })(<Password type="password" onBlur={events.handleConfirmBlur()} />)}
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={submitting}>
          Next
        </Button>
      </Form.Item>
    </Form>
  );
}

UserSettingCreator.propTypes = {
  form: PropTypes.object.isRequired,
  // onNext: PropTypes.func,
};

export default Form.create({ name: 'UserSettingCreator' })(UserSettingCreator);
