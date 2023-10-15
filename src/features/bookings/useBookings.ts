import { useQuery, useQueryClient } from '@tanstack/react-query';

import useUrl from '../../hooks/useUrl.ts';
import getBookings from '../../services/apiBookings.ts';
import { BookingFilterValues, BookingSortValues } from '../../types/enums.ts';
import { BookingsFilterValueTypes } from '../../types/types.ts';
import {
  MAX_ITEMS_ON_PAGE,
  QUERY_PAGE,
  QUERY_SORT,
  QUERY_STATUS,
} from '../../utils/const.ts';

function useBookings() {
  const queryClient = useQueryClient();
  const { readUrl } = useUrl();

  // Filter
  const filterValue = readUrl<BookingsFilterValueTypes>(QUERY_STATUS);
  const filter =
    !filterValue || filterValue === BookingFilterValues.ALL
      ? null
      : {
          field: 'status',
          value: filterValue,
          method: 'gte' as const,
        };

  // Sort
  const sortByRow = readUrl(QUERY_SORT) ?? BookingSortValues.START_DATE_DESK;
  const [field, direction] = sortByRow.split('-');
  const sortBy = { field, direction };

  // Pagination
  const pageQuery = readUrl(QUERY_PAGE);
  const page = !pageQuery ? 1 : Number(pageQuery);
  const prevPage = page - 1;
  const nextPage = page + 1;

  // Query
  const { data: { data: bookings, count } = {}, isLoading } = useQuery({
    queryKey: ['bookings', filter, sortBy, page],
    queryFn: () => getBookings(filter, sortBy, page),
  });

  // Pre-fetching next page
  const pageCount = Math.ceil((count ?? 0) / MAX_ITEMS_ON_PAGE);

  if (page < pageCount)
    void queryClient.prefetchQuery({
      queryKey: ['bookings', filter, sortBy, nextPage],
      queryFn: () => getBookings(filter, sortBy, nextPage),
    });

  // Pre-fetching prev page
  if (page > 1)
    void queryClient.prefetchQuery({
      queryKey: ['bookings', filter, sortBy, prevPage],
      queryFn: () => getBookings(filter, sortBy, prevPage),
    });

  return { bookings, isLoading, count };
}

export default useBookings;
