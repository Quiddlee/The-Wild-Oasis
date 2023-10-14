import { useCallback } from 'react';

import { HiChevronLeft, HiChevronRight } from 'react-icons/hi2';
import styled from 'styled-components';

import useUrl from '../hooks/useUrl.ts';
import { MAX_ITEMS_ON_PAGE, QUERY_PAGE } from '../utils/const.ts';

interface IPaginationButton {
  active?: boolean;
}

interface IPaginationProps {
  count: number;
}

const StyledPagination = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const P = styled.p`
  font-size: 1.4rem;
  margin-left: 0.8rem;

  & span {
    font-weight: 600;
  }
`;

const Buttons = styled.div`
  display: flex;
  gap: 0.6rem;
`;

const PaginationButton = styled.button<IPaginationButton>`
  background-color: ${(props) =>
    props.active ? ' var(--color-brand-600)' : 'var(--color-grey-50)'};
  color: ${(props) => (props.active ? ' var(--color-brand-50)' : 'inherit')};
  border: none;
  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  padding: 0.6rem 1.2rem;
  transition: all 0.3s;

  &:has(span:last-child) {
    padding-left: 0.4rem;
  }

  &:has(span:first-child) {
    padding-right: 0.4rem;
  }

  & svg {
    height: 1.8rem;
    width: 1.8rem;
  }

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;

function Pagination({ count }: IPaginationProps) {
  const { setUrl, readUrl } = useUrl();

  const currPage = readUrl(QUERY_PAGE);
  const currentPage = !currPage ? 1 : Number(currPage);
  const pageCount = Math.ceil(count / MAX_ITEMS_ON_PAGE);

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === pageCount;

  const pageItemsStart = (currentPage - 1) * MAX_ITEMS_ON_PAGE + 1;
  const pageItemsEnd =
    currentPage === pageCount ? count : currentPage * MAX_ITEMS_ON_PAGE;

  const nextPage = useCallback(() => {
    const next = isLastPage ? currentPage : currentPage + 1;

    setUrl(QUERY_PAGE, String(next));
  }, [currentPage, isLastPage, setUrl]);

  const prevPage = useCallback(() => {
    const prev = isFirstPage ? currentPage : currentPage - 1;

    setUrl(QUERY_PAGE, String(prev));
  }, [currentPage, isFirstPage, setUrl]);

  if (pageCount <= 1) return null;

  return (
    <StyledPagination>
      <P>
        Showing <span>{pageItemsStart}</span> to <span>{pageItemsEnd}</span> of{' '}
        <span>{count}</span> results
      </P>

      <Buttons>
        <PaginationButton onClick={prevPage} disabled={isFirstPage}>
          <HiChevronLeft />
          <span>Previous</span>
        </PaginationButton>
        <PaginationButton onClick={nextPage} disabled={isLastPage}>
          <span>Next</span>
          <HiChevronRight />
        </PaginationButton>
      </Buttons>
    </StyledPagination>
  );
}

export default Pagination;
