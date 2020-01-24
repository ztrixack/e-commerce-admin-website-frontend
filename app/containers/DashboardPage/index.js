/**
 *
 * DashboardPage
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { Card, Row, Col } from 'antd';
import SightBlock from 'components/SightBlock';
import LargeChartBlock from 'components/LargeChartBlock';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectDashboardPage from './selectors';
import reducer from './reducer';
import saga from './saga';
// import messages from './messages';
import { useHooks } from './hooks';

export function DashboardPage(props) {
  useInjectReducer({ key: 'dashboardPage', reducer });
  useInjectSaga({ key: 'dashboardPage', saga });

  const { totalPrice, frontierOrders, onlineOrders, totalOrder } = useHooks(
    props,
  );

  return (
    <Card bodyStyle={{ background: '#efeff6' }}>
      <Row gutter={[{ xs: 8, sm: 16, md: 24, lg: 32 }, 20]}>
        <Col xs={24} md={12} lg={6}>
          <SightBlock
            label="Total Price"
            amount={totalPrice[23]}
            icon="dollar"
            data={totalPrice}
            color="orange"
          />
        </Col>
        <Col xs={24} md={12} lg={6}>
          <SightBlock
            label="Total Order"
            amount={totalOrder[23]}
            icon="shopping"
            data={totalOrder}
            color="blue"
          />
        </Col>
        <Col xs={0} md={12} lg={6}>
          <SightBlock
            label="Frontier"
            amount={frontierOrders[23]}
            icon="home"
            data={frontierOrders}
            color="red"
          />
        </Col>
        <Col xs={0} md={12} lg={6}>
          <SightBlock
            label="Online"
            amount={onlineOrders[23]}
            icon="global"
            data={onlineOrders}
            color="green"
          />
        </Col>
      </Row>
      <Row gutter={[{ xs: 8, sm: 16, md: 24, lg: 32 }, 20]}>
        <Col md={24} lg={12}>
          Overall
        </Col>
        <Col xs={24} md={12} lg={6}>
          Top ten order
        </Col>
        <Col xs={24} md={12} lg={6}>
          Top ten income
        </Col>
      </Row>
      <Row gutter={[{ xs: 8, sm: 16, md: 24, lg: 32 }, 20]}>
        <Col>
          <LargeChartBlock
            datasetA={[65, 59, 80, 81, 56, 55, 40, 46, 26, 77, 54, 21]}
            datasetB={[28, 48, 40, 19, 86, 27, 90, 45, 44, 96, 46, 72]}
          />
        </Col>
      </Row>
    </Card>
  );
}

DashboardPage.propTypes = {
  // dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  dashboardPage: makeSelectDashboardPage(),
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

export default compose(withConnect)(DashboardPage);
