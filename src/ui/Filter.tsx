import styled, { css } from 'styled-components';

import useUrl from '../hooks/useUrl.ts';
import { IOptions } from '../types/interfaces.ts';
import { QUERY_PAGE } from '../utils/const.ts';

interface IFilterButton {
  $active: boolean;
}

interface IFilterProps<TOptionsValues extends string>
  extends IOptions<TOptionsValues> {
  filterField: string;
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
    props.$active &&
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
  const { setUrl, readUrl } = useUrl();

  const currFilter = readUrl(filterField) ?? options.at(0)!.value;

  function handleClick(value: TOptionValues) {
    const notFirstPage = readUrl(QUERY_PAGE);
    setUrl(filterField, value);

    if (notFirstPage) {
      setUrl(QUERY_PAGE, '1');
    }
  }

  return (
    <StyledFilter>
      {options.map((option) => (
        <FilterButton
          $active={currFilter === option.value}
          disabled={currFilter === option.value}
          key={option.value}
          onClick={() => handleClick(option.value)}>
          {option.label}
        </FilterButton>
      ))}
    </StyledFilter>
  );
}

export default Filter;
