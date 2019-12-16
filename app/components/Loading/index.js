/**
 *
 * Loading
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { Row, Col } from 'antd';

// import { FormattedMessage } from 'react-intl';
// import messages from './messages';

import loadingImage from 'assets/svg/loading.svg';

function Loading(props) {
  if (props.loading) {
    return (
      <Row
        style={{ minHeight: '100vh' }}
        type="flex"
        align="middle"
        justify="center"
      >
        <Col>
          <img src={loadingImage} alt="loading" />
        </Col>
      </Row>
    );
  }

  return React.Children.only(props.children);
}

Loading.propTypes = {
  loading: PropTypes.bool,
  children: PropTypes.element.isRequired,
};

export default Loading;
