import { useSearchParams } from 'react-router-dom';
import styled, { css } from 'styled-components';

interface IFilterButton {
  active: boolean;
}

interface Options<TValues extends string> {
  value: TValues;
  label: string;
}

interface IFilterProps<TOptionsValues extends string> {
  filterField: string;
  options: Options<TOptionsValues>[];
}

const StyledFilter = styled.div`
  border: 1px solid var(--color-grey-100);
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-sm);
  border-radius: var(--border-radius-sm);
  padding: 0.4rem;
  display: flex;
  gap: 0.4rem;
`;

const FilterButton = styled.button<IFilterButton>`
  background-color: var(--color-grey-0);
  border: none;
  text-transform: capitalize;

  ${(props) =>
    props.active &&
    css`
      background-color: var(--color-brand-600);
      color: var(--color-brand-50);
    `}

  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;
  /* To give the same height as select */
  padding: 0.44rem 0.8rem;
  transition: all 0.3s;

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;

function Filter<TOptionValues extends string>({
  filterField,
  options,
}: IFilterProps<TOptionValues>) {
  const [searchParams, setSearchParams] = useSearchParams();

  const currFilter = searchParams.get(filterField) ?? options.at(0)!.value;

  function handleClick(value: TOptionValues) {
    searchParams.set(filterField, value);
    setSearchParams(searchParams);
  }

  return (
    <StyledFilter>
      {options.map((option) => (
        <FilterButton
          active={currFilter === option.value}
          key={option.value}
          onClick={() => handleClick(option.value)}>
          {option.label}
        </FilterButton>
      ))}
    </StyledFilter>
  );
}

export default Filter;
