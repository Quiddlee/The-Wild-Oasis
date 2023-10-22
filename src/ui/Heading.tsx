import styled, { css } from 'styled-components';

import { ExtractValues } from '../types/types.ts';

const headingTypes = {
  H1: 'h1',
  H2: 'h2',
  H3: 'h3',
  H4: 'h4',
} as const;

type HeadingTypes = ExtractValues<typeof headingTypes>;

interface IHeading {
  as: HeadingTypes;
}

const Heading = styled.h1<IHeading>`
  ${(props) =>
    props.as === headingTypes.H1 &&
    css`
      font-size: 3rem;
      font-weight: 600;
    `};

  ${(props) =>
    props.as === headingTypes.H2 &&
    css`
      font-size: 2rem;
      font-weight: 600;
    `};

  ${(props) =>
    props.as === headingTypes.H3 &&
    css`
      font-size: 2rem;
      font-weight: 500;
    `};

  ${(props) =>
    props.as === headingTypes.H4 &&
    css`
      font-size: 3rem;
      font-weight: 600;
      text-align: center;
    `};

  line-height: 1.4;
`;

export default Heading;
