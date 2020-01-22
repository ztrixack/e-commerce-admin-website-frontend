/**
 *
 * ProductTable
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

import EditableTable from 'components/EditableTable';

// import { FormattedMessage } from 'react-intl';
// import messages from './messages';

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    width: '5%',
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    width: '25%',
    editable: true,
  },
  {
    title: 'Image',
    dataIndex: 'image',
    key: 'image',
    editable: true,
  },
  {
    title: 'Price',
    dataIndex: 'price',
    key: 'price',
    width: '10%',
    editable: true,
  },
  {
    title: 'Hidden',
    dataIndex: 'hidden',
    key: 'hidden',
    editable: true,
    width: '15%',
    render: hidden => hidden.toString(),
  },
];

function ProductTable(props) {
  return <EditableTable editable columns={columns} {...props} />;
}

ProductTable.propTypes = {
  dataSource: PropTypes.array,
  onAdd: PropTypes.func,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
};

export default ProductTable;
