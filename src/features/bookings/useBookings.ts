import { useQuery } from '@tanstack/react-query';

import useUrl from '../../hooks/useUrl.ts';
import getBookings from '../../services/apiBookings.ts';
import { BookingFilterValues, BookingSortValues } from '../../types/enums.ts';
import { BookingsFilterValueTypes } from '../../types/types.ts';
import { QUERY_PAGE, QUERY_SORT, QUERY_STATUS } from '../../utils/const.ts';

function useBookings() {
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

  const { data: { data: bookings, count } = {}, isLoading } = useQuery({
    queryKey: ['bookings', filter, sortBy, page],
    queryFn: () => getBookings(filter, sortBy, page),
  });

  return { bookings, isLoading, count };
}

export default useBookings;
