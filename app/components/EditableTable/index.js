/**
 *
 * EditableTable
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

import EditableContext from 'components/EditableContext';
import EditableCell from 'components/EditableCell';
import EditableRow from 'components/EditableRow';
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
      Products | <HeaderTextSize>{size}</HeaderTextSize> total
    </HeaderText>
  </React.Fragment>
);

// eslint-disable-next-line react/prefer-stateless-function
class EditableTable extends React.Component {
  constructor(props) {
    super(props);

    const setupDataTable = data =>
      data.map(d => Object.assign(d, { key: d.id }));

    this.state = {
      data: setupDataTable(props.dataSource || []),
      editingKey: '',
    };

    this.columns = [
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
      {
        title: 'operation',
        dataIndex: 'operation',
        width: '15%',
        render: (text, record) => {
          const editable = this.isEditing(record);
          return editable ? (
            <span>
              <EditableContext.Consumer>
                {form => (
                  <ClickableText onClick={() => this.save(form, record.key)}>
                    Save
                  </ClickableText>
                )}
              </EditableContext.Consumer>
              <ClickableText onClick={() => this.cancel(record.key)}>
                Cancel
              </ClickableText>
            </span>
          ) : (
            <span>
              <ClickableText
                disabled={this.state.editingKey !== ''}
                onClick={() => this.edit(record.key)}
              >
                Edit
              </ClickableText>
              <Popconfirm
                title="Sure to delete?"
                onConfirm={() => this.remove(record.key)}
              >
                <ClickableText disabled={this.state.editingKey !== ''}>
                  Delete
                </ClickableText>
              </Popconfirm>
            </span>
          );
        },
      },
    ];
  }

  isEditing = record => record.key === this.state.editingKey;

  cancel = key => {
    if (key === 'new') {
      this.remove(key);
    }

    this.setState({ editingKey: '' });
  };

  save = (form, key) => {
    form.validateFields((error, row) => {
      if (error) {
        return;
      }
      const newData = [...this.state.data];
      const index = newData.findIndex(item => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        this.setState({ data: newData, editingKey: '' });
      } else {
        newData.push(row);
        this.setState({ data: newData, editingKey: '' });
      }
    });
  };

  add = () => {
    const { data } = this.state;
    const newData = {
      key: 'new',
      name: '',
      image: '',
      price: 0,
      hidden: false,
    };
    this.setState({
      data: [...data, newData],
      editingKey: 'new',
    });
  };

  edit = key => {
    this.setState({ editingKey: key });
  };

  remove = key => {
    this.setState(state => ({
      data: state.data.filter(item => item.key !== key),
    }));
  };

  render() {
    const components = {
      body: {
        row: EditableRow,
        cell: EditableCell,
      },
    };

    const columns = this.columns.map(col => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          inputType: col.dataIndex === 'price' ? 'number' : 'text',
          dataIndex: col.dataIndex,
          title: col.title,
          editing: this.isEditing(record),
        }),
      };
    });

    return (
      <React.Fragment>
        <Button
          disabled={this.state.editingKey === 'new'}
          onClick={() => this.add()}
          type="primary"
          style={{ marginBottom: 16 }}
        >
          Add a row
        </Button>
        <Alert message={getHeaderTable(this.state.data.length)} type="info" />
        <Table
          components={components}
          bordered
          dataSource={this.state.data}
          columns={columns}
          pagination={{
            onChange: () => this.cancel,
          }}
        />
      </React.Fragment>
    );
  }
}

EditableTable.propTypes = {
  dataSource: PropTypes.array,
  // data: PropTypes.array,
  // editingKey: PropTypes.string,
  // events: PropTypes.object,
};

export default EditableTable;
