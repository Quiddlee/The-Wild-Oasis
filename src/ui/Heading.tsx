import styled, { css } from 'styled-components';

const headingTypes = {
  H1: 'h1',
  H2: 'h2',
  H3: 'h3',
} as const;

type HeadingTypes = (typeof headingTypes)[keyof typeof headingTypes];

interface IHeading {
  as: HeadingTypes;
}

const Heading = styled.h1<IHeading>`
  ${(props) =>
    props.as === headingTypes.H1 &&
    css`
      font-size: 20px;
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

  line-height: 1.4;
`;

export default Heading;
