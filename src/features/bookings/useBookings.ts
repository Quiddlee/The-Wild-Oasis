import { useQuery } from '@tanstack/react-query';

import useUrl from '../../hooks/useUrl.ts';
import getBookings from '../../services/apiBookings.ts';
import { BookingFilterValues, BookingSortValues } from '../../types/enums.ts';
import { BookingsFilterValueTypes } from '../../types/types.ts';
import { QUERY_SORT, QUERY_STATUS } from '../../utils/const.ts';

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

  const { data: bookings, isLoading } = useQuery({
    queryKey: ['bookings', filter, sortBy],
    queryFn: () => getBookings(filter, sortBy),
  });

  return { bookings, isLoading };
}

export default useBookings;
