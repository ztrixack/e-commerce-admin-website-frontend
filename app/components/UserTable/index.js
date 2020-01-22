/**
 *
 * UserTable
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
    title: 'Userame',
    dataIndex: 'username',
    key: 'username',
    width: '20%',
  },
  {
    title: 'Firstname',
    dataIndex: 'firstname',
    key: 'firstname',
    width: '20%',
    editable: true,
  },
  {
    title: 'Lastname',
    dataIndex: 'lastname',
    key: 'lastname',
    width: '20%',
    editable: true,
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
    width: '20%',
    editable: true,
  },
];

function UserTable(props) {
  return <EditableTable editable columns={columns} {...props} />;
}

UserTable.propTypes = {
  dataSource: PropTypes.array,
  onAdd: PropTypes.func,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
};

export default UserTable;
