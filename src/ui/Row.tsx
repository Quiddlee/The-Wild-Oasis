import styled, { css } from 'styled-components';

import { ExtractValues } from '../types/types.ts';

const rowTypes = {
  HORIZONTAL: 'horizontal',
  VERTICAL: 'vertical',
} as const;

type RowTypes = ExtractValues<typeof rowTypes>;

interface IRow {
  type?: RowTypes;
}

const Row = styled.div<IRow>`
  display: flex;

  ${(props) =>
    props.type === rowTypes.HORIZONTAL &&
    css`
      justify-content: space-between;
      align-items: center;
    `}

  ${(props) =>
    props.type === rowTypes.VERTICAL &&
    css`
      flex-direction: column;
      gap: 1.6rem;
    `}
`;

Row.defaultProps = {
  type: 'vertical',
};

export default Row;
