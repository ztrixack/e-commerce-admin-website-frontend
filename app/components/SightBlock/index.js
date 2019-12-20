/**
 *
 * SightBlock
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { Sparklines, SparklinesLine } from 'react-sparklines';
import { Card } from 'antd';

// import { FormattedMessage } from 'react-intl';
// import messages from './messages';
import { TextField, Label, Amount } from './styles';

function SightBlock(props) {
  return (
    <Card size="small">
      <Sparklines data={props.data} limit={24} height={20} margin={4}>
        <SparklinesLine color={props.color} />
      </Sparklines>
      <TextField>
        <Label>{props.label}</Label>
        <Amount>{props.amount}</Amount>
      </TextField>
    </Card>
  );
}

SightBlock.propTypes = {
  label: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
  data: PropTypes.arrayOf(PropTypes.number).isRequired,
  color: PropTypes.string.isRequired,
};

export default SightBlock;
