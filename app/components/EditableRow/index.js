/**
 *
 * EditableRow
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { Form } from 'antd';
import EditableContext from 'components/EditableContext';

// import { FormattedMessage } from 'react-intl';
// import messages from './messages';

function EditableRow(props) {
  const { form, index, ...restProps } = props;

  return (
    <EditableContext.Provider value={form}>
      <tr {...restProps} />
    </EditableContext.Provider>
  );
}

EditableRow.propTypes = {
  form: PropTypes.object,
  index: PropTypes.number,
  children: PropTypes.node,
};

export default Form.create()(EditableRow);
