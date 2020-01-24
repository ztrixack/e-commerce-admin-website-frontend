/**
 *
 * CustomTable
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { Alert, Button, Table, Popconfirm } from 'antd';

// import { FormattedMessage } from 'react-intl';
// import messages from './messages';
import { useHooks } from './hooks';
import {
  HeaderIcon,
  HeaderText,
  HeaderTextSize,
  ClickableText,
} from './styles';

const getHeaderTable = size => (
  <React.Fragment>
    <HeaderIcon type="info-circle" theme="filled" />
    <HeaderText>
      Users | <HeaderTextSize>{size}</HeaderTextSize> total
    </HeaderText>
  </React.Fragment>
);

const getOperationView = events => (text, record) => (
  <span>
    <ClickableText onClick={events.handleEdit(record.key)}>Edit</ClickableText>
    <Popconfirm
      title="Sure to delete?"
      onConfirm={events.handleRemove(record.key)}
    >
      <ClickableText>Delete</ClickableText>
    </Popconfirm>
  </span>
);

function CustomTable(props) {
  const { columns, data, loading, events } = useHooks(props);

  const cols = columns.concat({
    title: 'operation',
    dataIndex: 'operation',
    width: '15%',
    render: getOperationView(events),
  });

  return (
    <React.Fragment>
      <Button
        onClick={events.handleAdd()}
        type="primary"
        style={{ marginBottom: 16 }}
      >
        Add new user
      </Button>
      <Alert message={getHeaderTable(data.length)} type="info" />
      <Table
        bordered
        dataSource={data}
        columns={cols}
        size="middle"
        scroll={{ x: 'calc(700px + 50%)' }}
        loading={loading}
      />
    </React.Fragment>
  );
}

CustomTable.propTypes = {
  // columns: PropTypes.array,
  // dataSource: PropTypes.array,
  // onAdd: PropTypes.func,
  // onEdit: PropTypes.func,
  // onDelete: PropTypes.func,
};

export default CustomTable;
