import styled from 'styled-components';

import { Button } from 'antd';

const TextWrapper = styled.div`
  display: inline-block;
  font-size: 12px;
  color: rgba(0, 0, 0, 0.45);
`;

const ExtraButton = styled(Button)`
  margin-top: -4px;
`;

export { TextWrapper, ExtraButton };
