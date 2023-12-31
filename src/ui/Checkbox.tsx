import React from 'react';

import styled from 'styled-components';

interface ICheckboxProps {
  checked?: boolean;
  onChange?: () => void;
  disabled?: boolean;
  id?: string;
  children?: React.ReactNode;
}

const StyledCheckbox = styled.div`
  display: flex;
  gap: 1.6rem;

  & input[type='checkbox'] {
    height: 2.4rem;
    width: 2.4rem;
    outline-offset: 2px;
    transform-origin: 0;
    accent-color: var(--color-brand-600);
  }

  & input[type='checkbox']:disabled {
    accent-color: var(--color-brand-600);
  }

  & label {
    flex: 1;

    display: flex;
    align-items: center;
    gap: 0.8rem;
  }
`;

function Checkbox({
  checked,
  onChange,
  disabled = false,
  id,
  children,
}: ICheckboxProps) {
  return (
    <StyledCheckbox>
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
      />
      <label htmlFor={id}>{children}</label>
    </StyledCheckbox>
  );
}

Checkbox.defaultProps = {
  checked: null,
  onChange: null,
  disabled: null,
  id: null,
  children: null,
};

export default Checkbox;
