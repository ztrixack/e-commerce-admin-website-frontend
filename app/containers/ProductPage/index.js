/**
 *
 * ProductPage
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { Card, message } from 'antd';
import ProductTable from 'components/ProductTable';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectProductPage from './selectors';
import reducer from './reducer';
import saga from './saga';
// import messages from './messages';
import { useHooks } from './hooks';

export function ProductPage(props) {
  useInjectReducer({ key: 'productPage', reducer });
  useInjectSaga({ key: 'productPage', saga });

  const { dataSource, loading, error, alert, events } = useHooks(props);

  if (alert[0] !== '') {
    if (alert[0] === 'info') {
      message.info(alert[1]);
    } else {
      message.error(alert[1]);
    }
    events.resetAlert();
  }

  return (
    <Card loading={loading} error={error}>
      <ProductTable
        dataSource={dataSource}
        onAdd={events.handleAdd()}
        onEdit={events.handleEdit()}
        onDelete={events.handleDelete()}
      />
    </Card>
  );
}

ProductPage.propTypes = {
  // dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  productPage: makeSelectProductPage(),
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

export default compose(withConnect)(ProductPage);
