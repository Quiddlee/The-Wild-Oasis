import { ReactElement } from 'react';

import styled from 'styled-components';

const StyledFormRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  padding: 1.2rem 0;
`;

const StyledLabel = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

interface IFormRowVerticalProps {
  label?: string;
  isError?: boolean;
  children: ReactElement;
}

function FormRowVertical({ label, isError, children }: IFormRowVerticalProps) {
  return (
    <StyledFormRow>
      {label && <StyledLabel htmlFor={children.props.id}>{label}</StyledLabel>}
      {children}
      {isError && <Error>{isError}</Error>}
    </StyledFormRow>
  );
}

FormRowVertical.defaultProps = {
  isError: false,
  label: '',
};

export default FormRowVertical;
