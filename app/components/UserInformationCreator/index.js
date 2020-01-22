/**
 *
 * UserInformationCreator
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { Form, Input, Row, Col, Button, Divider, Select } from 'antd';

// import { FormattedMessage } from 'react-intl';
// import messages from './messages';
import { useHooks } from './hooks';

const roles = ['staff', 'admin'];

function UserInformationCreator(props) {
  const { getFieldDecorator } = props.form;

  const { alert, events } = useHooks(props);
  alert.call();

  return (
    <Form
      layout="vertical"
      style={{ maxWidth: 300 }}
      onSubmit={events.handleSubmit()}
    >
      <Row gutter={24}>
        <Col>
          <Form.Item label="Firstname">
            {getFieldDecorator('firstname', {
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
              initialValue: ['staff'],
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
          <Button type="outline" onClick={events.handleBack()}>
            Back
          </Button>
          <Divider type="vertical" style={{ visibility: 'hidden' }} />
          <Button type="primary" htmlType="submit">
            Create
          </Button>
        </Form.Item>
      </Row>
    </Form>
  );
}

UserInformationCreator.propTypes = {
  form: PropTypes.object,
  // onPrevious: PropTypes.func,
  // onComplete: PropTypes.func,
};

export default Form.create({ name: 'UserInformationCreator' })(
  UserInformationCreator,
);
