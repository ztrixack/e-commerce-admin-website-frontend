/**
 *
 * UserInformationEditor
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { Form, Input, Row, Col, Button, Select } from 'antd';

// import { FormattedMessage } from 'react-intl';
// import messages from './messages';
import { useHooks } from './hooks';

const roles = ['staff', 'admin'];

function UserInformationEditor(props) {
  const { getFieldDecorator } = props.form;

  const { user, alert, updating, events } = useHooks(props);
  alert.call();

  return (
    <Form onSubmit={events.handleSubmit()}>
      <Row gutter={24}>
        <Col span={16} style={{ maxWidth: 324 }}>
          <Form.Item label="Firstname">
            {getFieldDecorator('firstname', {
              initialValue: user.firstname,
              rules: [
                {
                  required: true,
                  message: 'Please input your firstname',
                },
              ],
            })(<Input />)}
          </Form.Item>
          <Form.Item label="Lastname">
            {getFieldDecorator('lastname', {
              initialValue: user.lastname,
              rules: [
                {
                  required: true,
                  message: 'Please input your lastname',
                },
              ],
            })(<Input />)}
          </Form.Item>
          <Form.Item label="E-mail">
            {getFieldDecorator('email', {
              initialValue: user.email,
              rules: [
                {
                  type: 'email',
                  message: 'Please input a valid e-mail',
                },
                {
                  required: true,
                  message: 'Please input your e-mail',
                },
              ],
            })(<Input />)}
          </Form.Item>
          <Form.Item label="Roles">
            {getFieldDecorator('roles', {
              initialValue: user.roles,
              rules: [
                {
                  required: true,
                  message: 'Assign roles for this user',
                  type: 'array',
                },
              ],
            })(
              <Select mode="multiple" placeholder="Please select">
                {roles.map(role => (
                  <Select.Option key={role} value={role}>
                    {role}
                  </Select.Option>
                ))}
              </Select>,
            )}
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={updating}>
            Update
          </Button>
        </Form.Item>
      </Row>
    </Form>
  );
}

UserInformationEditor.propTypes = {
  form: PropTypes.object,
  // user: PropTypes.object,
};

export default Form.create({ name: 'UserInformationEditor' })(
  UserInformationEditor,
);
