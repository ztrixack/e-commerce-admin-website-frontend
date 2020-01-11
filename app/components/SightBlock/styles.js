import styled from 'styled-components';

import { Input, Button } from 'antd';

const TextField = styled.p`
  padding: 8px;
  font-size: 1.5rem;
  vertical-align: middle;
  margin-bottom: 0px;
`;

const Label = styled.span`
  font-weight: light;
  font-size: 0.75em;
  float: left !important;
`;

const Amount = styled.span`
  font-weight: bold;
  float: right !important;
`;

export { TextField, Label, Amount };
