/**
 *
 * EditableCell
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { Form, Input, InputNumber } from 'antd';
import EditableContext from 'components/EditableContext';

// import { FormattedMessage } from 'react-intl';
// import messages from './messages';
import { TableCell } from './styles';

function EditableCell(props) {
  const getInput = () => {
    if (props.inputType === 'number') {
      return <InputNumber />;
    }
    return <Input />;
  };

  const {
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    ...restProps
  } = props;

  return (
    <EditableContext.Consumer>
      {form => {
        const { getFieldDecorator } = form;
        return (
          <TableCell {...restProps}>
            {editing ? (
              <Form.Item style={{ margin: 0 }}>
                {getFieldDecorator(dataIndex, {
                  rules: [
                    {
                      required: true,
                      message: `Please Input ${title}!`,
                    },
                  ],
                  initialValue: record[dataIndex],
                })(getInput())}
              </Form.Item>
            ) : (
              restProps.children
            )}
          </TableCell>
        );
      }}
    </EditableContext.Consumer>
  );
}

EditableCell.propTypes = {
  editing: PropTypes.bool,
  dataIndex: PropTypes.string,
  title: PropTypes.string,
  inputType: PropTypes.string,
  record: PropTypes.object,
  index: PropTypes.number,
  children: PropTypes.node,
};

export default EditableCell;
