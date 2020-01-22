/**
 *
 * SettingProtector
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { Button, Collapse, Divider, Form } from 'antd';

// import { FormattedMessage } from 'react-intl';
// import messages from './messages';
import { useHooks } from './hooks';
import { TextWrapper, ExtraButton } from './styles';

const { Panel } = Collapse;

function SettingProtector(props) {
  const { loading } = props;
  const { active, key, alert, events } = useHooks(props);
  alert.call();

  return (
    <Form onSubmit={events.handleSubmit()}>
      <Collapse activeKey={active ? key : ''}>
        <Panel
          key={key}
          showArrow={false}
          header={
            <React.Fragment>
              <h4>{props.title}</h4>
              <TextWrapper>{props.details}</TextWrapper>
            </React.Fragment>
          }
          extra={
            !active && (
              <ExtraButton type="link" onClick={events.handleChange(true)}>
                {props.button}
              </ExtraButton>
            )
          }
        >
          <React.Fragment>
            {props.children}
            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading}>
                Save
              </Button>
              <Divider type="vertical" style={{ visibility: 'hidden' }} />
              <Button disabled={loading} onClick={events.handleChange(false)}>
                Cancel
              </Button>
            </Form.Item>
          </React.Fragment>
        </Panel>
      </Collapse>
    </Form>
  );
}

SettingProtector.propTypes = {
  title: PropTypes.string,
  details: PropTypes.string,
  button: PropTypes.string,
  loading: PropTypes.bool,
  children: PropTypes.node,
  // onSubmit: PropTypes.func,
};

export default SettingProtector;
