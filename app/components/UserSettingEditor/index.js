/**
 *
 * UserSettingEditor
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { Form, Input } from 'antd';

import SettingProtector from 'components/SettingProtector';

// import { FormattedMessage } from 'react-intl';
// import messages from './messages';
import { useHooks } from './hooks';

const { Password } = Input;

function UserSettingEditor(props) {
  const { form } = props;
  const { alert, updating, events } = useHooks(props);
  alert.call();

  return (
    <React.Fragment>
      <SettingProtector
        title="Account Password"
        details="Current Password Strength: Strong"
        button="Modify"
        loading={updating}
        form={form}
        onSave={events.handleSave()}
      >
        <Form.Item label="Old Password">
          {form.getFieldDecorator('oldpassword', {
            rules: [
              {
                required: true,
                message: 'Please input your password!',
              },
            ],
          })(<Password type="password" />)}
        </Form.Item>
        <Form.Item label="New Password" hasFeedback>
          {form.getFieldDecorator('password', {
            rules: [
              {
                required: true,
                message: 'Please input your new password!',
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
                message: 'Please confirm your new password!',
              },
              {
                validator: events.handleCompareToFirstPassword(),
              },
            ],
          })(<Password type="password" onBlur={events.handleConfirmBlur()} />)}
        </Form.Item>
      </SettingProtector>
    </React.Fragment>
  );
}

UserSettingEditor.propTypes = {
  form: PropTypes.object,
  // user: PropTypes.object,
};

export default Form.create({ name: 'UserSettingEditor' })(UserSettingEditor);
