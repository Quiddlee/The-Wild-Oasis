import { SyntheticEvent } from 'react';

import styled from 'styled-components';

import { IOption } from '../types/interfaces.ts';

interface IStyledSelect {
  type?: 'white';
}

interface ISelectProps<TOption> extends IStyledSelect {
  options: TOption[];
  value: string;
  onChange: (e: SyntheticEvent) => void;
}

const StyledSelect = styled.select<IStyledSelect>`
  font-size: 1.4rem;
  padding: 0.8rem 1.2rem;
  border: 1px solid
    ${(props) =>
      props.type === 'white'
        ? 'var(--color-grey-100)'
        : 'var(--color-grey-300)'};
  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-0);
  font-weight: 500;
  box-shadow: var(--shadow-sm);
`;

function Select<TOption extends IOption<string>>({
  options,
  value,
  type,
  onChange,
}: ISelectProps<TOption>) {
  return (
    <StyledSelect onChange={onChange} value={value} type={type}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </StyledSelect>
  );
}

Select.defaultProps = {
  type: null,
};

export default Select;
