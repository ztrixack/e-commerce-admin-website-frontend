/**
 *
 * CustomTable
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { Alert, Button, Table, Popconfirm } from 'antd';

// import { FormattedMessage } from 'react-intl';
// import messages from './messages';
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

// eslint-disable-next-line react/prefer-stateless-function
class CustomTable extends React.Component {
  constructor(props) {
    super(props);

    this.operations = {
      title: 'operation',
      dataIndex: 'operation',
      width: '15%',
      render: (text, record) => (
        <span>
          <ClickableText onClick={() => this.edit(record.key)}>
            Edit
          </ClickableText>
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => this.remove(record.key)}
          >
            <ClickableText>Delete</ClickableText>
          </Popconfirm>
        </span>
      ),
    };

    const setupDataTable = data =>
      data.map(d => Object.assign(d, { key: d.id }));

    this.state = {
      columns: props.columns.concat(this.operations),
      data: setupDataTable(props.dataSource || []),
    };
  }

  add = () => {
    this.props.onAdd();
  };

  edit = key => {
    this.props.onEdit(key);
  };

  remove = async key => {
    const success = await this.props.onDelete(key);

    if (success) {
      this.setState(state => ({
        data: state.data.filter(item => item.key !== key),
      }));
    }
  };

  render() {
    return (
      <React.Fragment>
        <Button
          onClick={() => this.add()}
          type="primary"
          style={{ marginBottom: 16 }}
        >
          Add new user
        </Button>
        <Alert message={getHeaderTable(this.state.data.length)} type="info" />
        <Table
          bordered
          dataSource={this.state.data}
          columns={this.state.columns}
          size="middle"
          scroll={{ x: 'calc(700px + 50%)' }}
        />
      </React.Fragment>
    );
  }
}

CustomTable.propTypes = {
  columns: PropTypes.array,
  dataSource: PropTypes.array,
  onAdd: PropTypes.func,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
};

export default CustomTable;
