import { useQuery } from '@tanstack/react-query';

import useUrl from '../../hooks/useUrl.ts';
import getBookings from '../../services/apiBookings.ts';
import { BookingFilterValues } from '../../types/enums.ts';
import { BookingsFilterValueTypes } from '../../types/types.ts';
import { QUERY_STATUS } from '../../utils/const.ts';

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

  const { data: bookings, isLoading } = useQuery({
    queryKey: ['bookings', filter],
    queryFn: () => getBookings(filter),
  });

  return { bookings, isLoading };
}

export default useBookings;
