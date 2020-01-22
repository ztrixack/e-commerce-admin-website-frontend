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

    this.operations = {
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
    };

    const setupDataTable = data =>
      data.map(d => Object.assign(d, { key: d.id }));

    this.state = {
      columns: props.columns.concat(this.operations),
      data: setupDataTable(props.dataSource || []),
      editingKey: '',
    };
  }

  isEditing = record => record.key === this.state.editingKey;

  isNewRecord = key => key === 'new';

  cancel = key => {
    if (this.isNewRecord(key)) this.remove(key);

    this.setState({ editingKey: '' });
  };

  save = (form, key) => {
    form.validateFields(async (error, row) => {
      if (error) {
        return;
      }

      let result;
      const newData = [...this.state.data];
      const index = newData.findIndex(d => d.key === key);
      const item = newData[index];
      const newItem = Object.assign({}, item, row);
      delete newItem.key;

      if (this.isNewRecord(key)) {
        result = await this.props.onAdd(newItem);
      } else {
        result = await this.props.onEdit(newItem.id, newItem);
      }

      if (result) {
        result.key = result.id;
        newData.splice(index, 1, {
          ...item,
          ...result,
        });
        this.setState({
          data: newData,
          editingKey: '',
        });
      } else {
        this.setState({
          editingKey: '',
        });
      }
    });
  };

  add = () => {
    this.setState(state => ({
      data: [
        ...state.data,
        {
          key: 'new',
          name: '',
          image: '',
          price: 0,
          hidden: false,
        },
      ],
      editingKey: 'new',
    }));
  };

  edit = key => {
    this.setState({ editingKey: key });
  };

  remove = async key => {
    let success = true;

    if (!this.isNewRecord(key)) {
      success = await this.props.onDelete(key);
    }

    if (success) {
      this.setState(state => ({
        data: state.data.filter(item => item.key !== key),
      }));
    }
  };

  getInputType = dataIndex => {
    switch (dataIndex) {
      case 'price':
        return 'number';

      case 'hidden':
        return 'boolean';

      default:
        return 'text';
    }
  };

  render() {
    const components = {
      body: {
        row: EditableRow,
        cell: EditableCell,
      },
    };

    const columns = this.state.columns.map(col => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          inputType: this.getInputType(col.dataIndex),
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
  columns: PropTypes.array,
  dataSource: PropTypes.array,
  onAdd: PropTypes.func,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
};

export default EditableTable;
