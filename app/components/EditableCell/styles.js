import styled from 'styled-components';

const TableCell = styled.td`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 0;

  &:hover {
    overflow: visible;
    white-space: unset;
  }
`;

export { TableCell };
