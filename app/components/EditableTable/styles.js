import styled from 'styled-components';

import { Icon } from 'antd';

const HeaderIcon = styled(Icon)`
  display: contents;
  color: #1890ff;
`;

const HeaderText = styled.span`
  padding: 0 14px;
`;

const HeaderTextSize = styled.span`
  color: #1890ff;
`;

const ClickableText = styled.a`
  margin-right: 8px;
`;

const Ellipsis = styled.span`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 0;

  &:hover {
    overflow: visible;
  }
`;

export { HeaderIcon, HeaderText, HeaderTextSize, ClickableText, Ellipsis };
